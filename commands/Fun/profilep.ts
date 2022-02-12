"use strict";

import Discord, { Client, Message } from "discord.js";
export default {
  name: "profilepic",
  category: "Fun",
  cooldown: 1,
  aliases: ["picture", "av", "avatar"],
  usage: "profilepic <username>",
  description: "gets the profile pic of the person asked",
  run: async (client: Client, message: Message, args: string[]) => {
    let embed = new Discord.MessageEmbed().setColor("RANDOM");
    if (!args[0]) {
      embed
        .setImage(message.author.displayAvatarURL())
        .setTitle(`${message.author.username}'s Profile Image`);
      message.channel.send({ embeds: [embed] });
    } else if (args[0]) {
      let user = message.mentions.users.first();
      embed.setImage(user?.displayAvatarURL()!).setTitle(`Profile Image`);
      message.channel.send({ embeds: [embed] });
    }
  },
};
