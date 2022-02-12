import mongo from "../botconfig/mongo";
import economySchema from "../Schemas/economySchema";
import errHandler from "../handlers/errorHandler";
import inventory from "../Schemas/inventory";
import { Message } from "discord.js";
async function createUser(
  userID: string,
  coins: number,
  bank: number,
  bs: number
) {
  /**
   * @param userID nothing much lol
   */
  await mongo().then(async () => {
    try {
      await economySchema.findOneAndUpdate(
        { userID: userID },
        { userID: userID, coins: coins, bank: bank, bankSpace: bs },
        { upsert: true }
      );
      await inventory.findOneAndUpdate(
        { userId: userID },
        { inventory: [] },
        { upsert: true }
      );
    } catch (err: any) {
      errHandler(err);
    }
  });
  //code
}
class economy {
  /**
   * @param userID
   * id of the the user
   * @param coins
   * the amoutn of coins to be added
   */
  async donate(userID: string, coins: number, message: Message) {
    await mongo().then(async () => {
      try {
        let f = await economySchema.findOne({ userID: userID });
        let u = await economySchema.findOne({ userID: message.author.id });

        if (!f) {
          message.channel.send(
            "That user doesn't have a economy account. I have made him an account and also added the coins needed"
          );
          createUser(userID, 10000 + coins, 0, 1000);
        } else if (!u) {
          message.channel.send(
            "Sorry mate no account found, I'll make you an account but you can't give your friend the money"
          );
          createUser(message.author.id, 10000 + coins, 0, 1000);
        } else {
          message.channel.send("Transaction Processeing").then(async (msg) => {
            msg.edit({ content: "Transcation Approved" });
            await this.addCoins(userID, coins);
            await this.deductCoins(message.author.id, coins);
          });
        }
      } catch (err: any) {
        errHandler(err, message);
      }
    });
  }
  async addCoins(userID: string, coins: number) {
    let ua = await economySchema.findOne({ userID: userID });
    if (!ua) return await createUser(userID, 10000 + coins, 10000, 10000);
    let ec = ua.coins;
    await economySchema.updateOne({ userID: userID }, { coins: ec + coins });
  }
  async deductCoins(userID: string, coins: number) {
    let ua = await economySchema.findOne({ userID: userID });
    if (!ua) return await createUser(userID, 10000, 10000, 10000);
    let ec = ua.coins;
    if (ec < coins) return false;
    await createUser(userID, ec - coins, ua.bank, ua.bankSpace);
    return true;
  }
  async deposit(
    userID: string,
    coins: number | "all" | "max" | "." | "*",
    message: Message
  ) {
    let msg = await message.channel.send("Transaction Processing...");
    let ua = await economySchema.findOne({ userID: userID });
    if (!ua) {
      await createUser(userID, 10000, 10000, 10000);
    }
    let bank = ua?.bank as number;
    let bankSpace = ua?.bankSpace as number;
    if (coins === "all" || coins === "max" || coins === "." || coins === "*") {
      coins = ua?.coins as number;
    }
    let tot = coins + bank!;

    if (tot > bankSpace) {
      msg.edit("Transaction Failed :x:");
      let cb = coins - bankSpace;
      message.channel.send(
        `I am sorry but the amount of coins to be deposited cannot be deposited\nas you don't have enough bank space\nYBCs to be deposited:${
          coins - bankSpace
        }`
      );
      this.deductCoins(userID, cb);
      this.addMoneyBank(userID, cb);
      return;
    }
    msg.edit("Transaction Success ✔️");
    this.deductCoins(userID, coins);

    this.addMoneyBank(userID, coins + bank);
  }
  async withdraw(
    userID: string,
    coins: number | "all" | "max" | "." | "*",
    message: Message
  ) {
    let msg = await message.channel.send("Transaction Processing");
    let ua = await economySchema.findOne({ userID: userID });
    if (!ua) {
      await createUser(userID, 10000, 10000, 10000);
      return;
    }
    let bank = ua.bank;
    let bankSpace = ua.bankSpace;
    if (coins === "all" || coins === "max" || coins === "." || coins === "*") {
      coins = ua.bank;
    }
    let tot = bank - coins;

    if (tot < 0) {
      msg.edit("Transaction Failed :x:");
      let cb = coins - bankSpace;
      message.channel.send(`Your taking more money then you own.`);
      return;
    }
    msg.edit("Transaction Success✔️");
    await this.addCoins(userID, coins);
    await this.removeMoneyBank(userID, coins);
  }
  async addMoneyBank(userID: string, coins: number) {
    let ua = await economySchema.findOne({ userID: userID });
    if (!ua) return await createUser(userID, 10000, 10000, 10000);
    let eb = ua.bank;
    await economySchema.updateOne({ userID }, { bank: eb + coins });
  }
  async removeMoneyBank(userID: string, coins: number) {
    let ua = await economySchema.findOne({ userID: userID });
    if (!ua) return await createUser(userID, 10000, 10000, 10000);
    let eb = ua.bank;
    await economySchema.updateOne({ userID }, { bank: eb - coins });
  }
  async increaseBankSpace(userID: string, coins: number) {
    let ua = await economySchema.findOne({ userID: userID });
    if (!ua) return await createUser(userID, 10000, 10000, 10000);
    let ec = ua.coins;
    let eb = ua.bankSpace;
    await economySchema.updateOne({ userID }, { bankSpace: eb + coins });
  }
  async decreaseBankSpace(userID: string, coins: number) {
    let ua = await economySchema.findOne({ userID: userID });
    if (!ua) return await createUser(userID, 10000, 10000, 10000);
    let ec = ua.coins;
    let eb = ua.bankSpace;
    await economySchema.updateOne({ userID }, { bankSpace: eb - coins });
  }
  async createUser(userID: string, coins: number, bank: number, bs: number) {
    await createUser(userID, coins, bank, bs);
  }
  async findUser(userID: string) {
    return await economySchema.findOne({ userID: userID });
  }
  async generateLeaderboard(amount: number, message: Message) {
    const filter = {};
    const allUsers = await economySchema.find(filter);
    let similarUsers: { userID: string; coins: number }[] = [];
    allUsers.forEach((result) => {
      message.guild?.members.cache.get(result.userID)
        ? similarUsers.push({ userID: result.userID, coins: result.coins })
        : null;
    });
    function compare(b: { coins: number }, a: { coins: number }) {
      if (a.coins < b.coins) {
        return -1;
      }
      if (a.coins > b.coins) {
        return 1;
      }
      return 0;
    }

    let done = similarUsers.sort(compare);
    console.log(done);
    return done;
  }
}
export default economy;
