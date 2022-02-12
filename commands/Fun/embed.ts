"use strict";

import { Client, Message } from "discord.js";

import { MessageEmbed } from "discord.js";
const ee = require("../../botconfig/embed.json");
export default {
  name: "embed",
  category: "Fun",
  aliases: ["say-embed"],
  cooldown: 2,
  usage: "embed <TITLE> ++ <DESCRIPTION>",
  description: "Resends a message from you as an Embed",
  run: async (client: Client, message: Message, args: string[]) => {
    try {
      if (!args[0]) {
        let embed = new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(
            `❌ ERROR | You didn't provided a Title, nor a Description`
          );
        return message.channel.send({ embeds: [embed] });
      }
      let userargs = args.join(" ").split("++");
      let title = userargs[0];
      let desc = userargs.slice(1).join(" ");

      let embed = new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(title ? title : "")
        .setDescription(desc ? desc : "");
      message.channel.send({ embeds: [embed] });
    } catch (e) {
      const errHandler = require("../../handlers/errorHandler");
      errHandler.erroHandler(e, message);
    }
  },
};
/** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */
