"use strict";

import { Client, Message, MessageEmbed } from "discord.js";
import { MessageMentions } from "discord.js";
import ee from "../../botconfig/embed.json";
module.exports = {
  name: "say",
  category: "Fun",
  cooldown: 2,
  usage: "say <TEXT>",
  description: "Resends your Text",
  run: async (client: Client, message: Message, args: string[]) => {
    const text = args[0];
    try {
      if (!args[0])
        return message.channel.send({
          embeds: [
            new MessageEmbed()
              .setColor("RED")
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`❌ ERROR | You didn't provided a Text`)
              .setDescription(`Usage: \`say <TEXT>\``),
          ],
        });
      if (
        MessageMentions.USERS_PATTERN.test(text) ||
        MessageMentions.ROLES_PATTERN.test(text)
      )
        return message.reply("I am not allowed to mention roles or users");

      message.channel.send(text);
    } catch (e: any) {
      console.log(String(e.stack).bgRed);
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("RED")
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``),
        ],
      });
    }
  },
};

/** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */
