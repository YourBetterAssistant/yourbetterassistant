"use strict";

import { Client, Message, MessageEmbed } from "discord.js";
import ee from "../../botconfig/embed.json";
module.exports = {
  name: "ping",
  category: "Information",
  aliases: ["latency"],
  cooldown: 2,
  usage: "ping",
  description: "Gives you information on how fast the Bot can respond to you",
  run: async (client: Client, message: Message) => {
    try {
      let e = new MessageEmbed()
        .setColor("BLUE")
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`🏓 Pinging....`);
      message.channel.send({ embeds: [e] }).then((msg) => {
        let em = new MessageEmbed()
          .setColor("BLUE")
          .setFooter(ee.footertext, ee.footericon)
          .setTitle("Pong!")
          .addField(
            "Command Latency",
            `🏓 Command Latency is \`${
              Date.now() - message.createdTimestamp
            }ms\``
          )
          .addField(
            "API Latency",
            `🏓 API Latency is \`${Math.round(client.ws.ping)}ms\``
          );
        msg.edit({ embeds: [em] });
      });
    } catch (e: any) {
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
