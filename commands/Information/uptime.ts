"use strict";

import { Client, Message, MessageEmbed } from "discord.js";
import ee from "../../botconfig/embed.json";
import funcs from "../../handlers/functions";
module.exports = {
  name: "uptime",
  category: "Information",
  aliases: [""],
  cooldown: 10,
  usage: "uptime",
  description: "Returns the duration on how long the Bot is online",
  run: async (client: Client, message: Message) => {
    const { duration } = funcs;
    try {
      let embed = new MessageEmbed()
        .setColor("BLUE")
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(
          `:white_check_mark: **${
            client.user?.username
          }** is since:\n ${duration(client.uptime!)} online`
        );
      message.channel.send({ embeds: [embed] });
    } catch (e: any) {
      console.log(String(e.stack).bgRed);
      let embed = new MessageEmbed()
        .setColor("RED")
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`❌ ERROR | An error occurred`)
        .setDescription(`\`\`\`${e.stack}\`\`\``);
      return message.channel.send({ embeds: [embed] });
    }
  },
};

/** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */
