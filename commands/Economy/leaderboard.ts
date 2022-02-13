"use strict";

import money from "../../Constructors/economy";
import funcs from "../../handlers/functions";
import { Client, GuildMember, Message, MessageEmbed } from "discord.js";
const currency = new money();
module.exports = {
  name: "rich",
  description: "Currency Leaderboard first q0",
  category: "Economy",
  memberpermissions: "VIEW_CHANNEL",
  usage: "leaderboard",
  run: async (client: Client, message: Message, args: string[]) => {
    const { numberWithCommas } = funcs;
    let leaderboard = await currency.generateLeaderboard(1, message);

    if (leaderboard.length < 1)
      return message.channel.send("Nobody's on the leaderboard.");

    function fullUser(u: GuildMember) {
      return `${u.user.username}#${u.user.discriminator}`;
    }

    const embed = new MessageEmbed().setTitle(`Leaderboard`).setColor("RANDOM");
    let i = 1;
    leaderboard.forEach((item) => {
      if (i >= 10) {
        return;
      } else {
        embed.addField(
          `${i++}`,
          `${fullUser(
            message.guild?.members.cache.get(item.userID)!
          )}:${numberWithCommas(item.coins)}YBCs`
        );
      }
    });

    message.channel.send({ embeds: [embed] });
  },
};
