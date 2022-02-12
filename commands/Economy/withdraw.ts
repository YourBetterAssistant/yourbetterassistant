"use strict";

import { Client, Message } from "discord.js";
import money from "../../Constructors/economy";
const economy = new money();
export default {
  name: "withdraw",
  aliases: ["with"],
  description: "withdraw money",
  category: "Economy",
  guildOnly: true,
  memberpermissions: "VIEW_CHANNEL",
  cooldown: 10,
  usage: "withdraw <amount>",
  run: async (client: Client, message: Message, args: string[]) => {
    //if(isNaN(args[0])) return message.channel.send('That is not a real number')
    let coins = args[0];
    let user = message.author;
    reply(`Withdrawing ${coins}YMCs from the bank!`, true, message);
    if (coins === "all") {
      await economy.withdraw(user.id, coins, message);
      return;
    }
    if (isNaN(parseInt(coins))) {
      return message.reply("that is not a number");
    } else await economy.withdraw(user.id, parseInt(coins), message);
  },
};
