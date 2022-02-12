"use strict";

import { Client, Message, MessageEmbed } from "discord.js";
export default {
  name: "servers",
  aliases: ["guilds", "list-guilds"],
  description: "lists the guild names of all the guilds the bot is in",
  category: "OWNER",
  memberpermissions: "VIEW_CHANNEL",
  cooldown: 20,
  usage: "servers",
  run: async (client: Client, message: Message) => {
    if (message.author.id != "827388013062389761")
      return message.channel.send("This Commnd is Not For You");
    let embed = new MessageEmbed().setTitle("Servers").setColor("RANDOM");
    await client.guilds.cache.forEach((guild) => {
      embed.addField("Server:", `${guild.name}`, true);
    });
    const user = await client.users.fetch("827388013062389761");
    user.send({ embeds: [embed] });
  },
};
