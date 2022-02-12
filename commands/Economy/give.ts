"use strict";

import { Message, Client } from "discord.js";
import money from "../../Constructors/economy";
const currency = new money();
import { reply } from "../../exports";
export default {
  name: "donate",
  aliases: ["give"],
  description: "donate your YBCs to someone else",
  category: "Economy",
  memberpermissions: "VIEW_CHANNEL",
  cooldown: 10,
  usage: "give <coins> <user>",
  run: async (client: Client, message: Message, args: string[]) => {
    if (isNaN(parseInt(args[0])))
      return message.channel.send("That is not a real number");
    const member = message.mentions?.members?.first();
    let coins = args[0];
    if (!member)
      return message.channel.send("Who are you giving the coins to?");
    if (!coins) return message.channel.send("How many coins are you giving?");
    await currency.donate(member.id, parseInt(coins), message);
    reply(`You have given ${member}, ${coins}YBCs`, true, message);
  },
};
