"use strict";

import { Client, Message } from "discord.js";
import money from "../../Constructors/economy";
const economy = new money();
module.exports = {
  name: "beg",
  description: "beg for YBCs",
  category: "Economy",
  guildOnly: true,
  memberpermissions: "VIEW_CHANNEL",
  cooldown: 20,
  usage: "beg",
  run: async (client: Client, message: Message, args: string[]) => {
    const randomCoins = Math.floor(Math.random() * 99) + 1; // Random amount of coins.
    await economy.addCoins(message.member?.id!, randomCoins);
    message.reply({
      content: `You have gotten ${randomCoins}YBCs from begging!`,
      allowedMentions: { repliedUser: true },
    });
  },
};
