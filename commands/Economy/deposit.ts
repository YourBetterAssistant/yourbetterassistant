"use strict";

import Discord, { Client, Message } from "discord.js";
import money from "../../Constructors/economy";
const currency = new money();
import { reply } from "../../exports";
module.exports = {
  name: "deposit",
  aliases: ["dep"],
  description: "deposits YMCs to the bank",
  category: "Economy",
  guildOnly: true,
  memberpermissions: "VIEW_CHANNEL",
  adminPermOverride: true,
  cooldown: 5,
  usage: "deposit <amount>",
  run: async (client: Client, message: Message, args: string[]) => {
    let coins = args[0];
    let user = message.author;
    reply(`Withdrawing ${coins}YMCs from the bank!`, true, message);
    if (coins === "all" ?? coins === "." ?? coins === "*" ?? coins === "max") {
      await currency.deposit(
        user.id,
        (
          await currency.findUser(message.author.id)
        )?.coins!,
        message
      );
      return;
    }
    if (isNaN(parseInt(coins))) {
      return message.reply("that is not a number");
    }
    await currency.deposit(user.id, parseInt(coins), message);
    return;
  },
};
