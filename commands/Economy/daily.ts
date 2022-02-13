"use strict";

import { Client, Message, MessageEmbed } from "discord.js";
import funcs from "../../handlers/functions";
import economySchema from "../../Schemas/economySchema";

module.exports = {
  name: "daily",
  description: "Get your daily YBCs",
  category: "Economy",
  guildOnly: true,
  memberpermissions: "VIEW_CHANNEL",
  adminPermOverride: true,
  cooldown: 60 * 60 * 24,
  usage: "daily",
  run: async (client: Client, message: Message, args: string[]) => {
    const { duration } = funcs;
    let db = await economySchema.findOne({ userID: message.author.id });
    await economySchema.updateOne(
      { userID: message.author.id },
      {
        coins: db?.coins! + 50000,
      }
    );
    const embed = new MessageEmbed()
      .setTitle("You have gotten 50,000YBCs!")
      .setDescription("Redeem again in 24 hours!")
      .setColor("GREEN");
    message.channel.send({ embeds: [embed] });
  },
};
