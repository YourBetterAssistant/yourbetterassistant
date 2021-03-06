"use strict";

import Levels from "discord-xp";
import { Client, Message, MessageEmbed } from "discord.js";
module.exports = {
  name: "leaderboard",
  description: "Shows the leaderboard",
  category: "levels",
  guildOnly: true,
  memberpermissions: "VIEW_CHANNEL",
  cooldown: 2,
  usage: "leaderboard",
  run: async (client: Client, message: Message) => {
    const rawLeaderboard = await Levels.fetchLeaderboard(
      message.guild?.id!,
      10
    ); // We grab top 10 users with most xp in the current server.

    if (rawLeaderboard.length < 1)
      return message.reply("Nobody's in leaderboard yet.");

    const leaderboard = await Levels.computeLeaderboard(
      client,
      rawLeaderboard,
      true
    ); // We process the leaderboard.

    const lb = leaderboard.map(
      (e) =>
        `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${
          e.level
        }\nXP: ${e.xp.toLocaleString()}`
    ); // We map the outputs.
    let embed = new MessageEmbed()
      .setTitle("Leaderboard")
      .setDescription(`**Leaderboard**:\n\n${lb.join("\n\n")}`)
      .setColor("RANDOM");

    message.channel.send({ embeds: [embed] });
  },
};
