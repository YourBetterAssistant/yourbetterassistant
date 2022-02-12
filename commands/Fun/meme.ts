"use strict";

const gottem = require("djs-meme");
import Discord, { Client, Message } from "discord.js";
export default {
  name: "meme",
  description: "sends a meme",
  category: "Fun",
  guildOnly: true,
  memberpermissions: "VIEW_CHANNEL",
  cooldown: 5,
  usage: "meme",
  run: async (client: Client, message: Message, args: string[]) => {
    const Meme = await gottem.meme();
    let embed = new Discord.MessageEmbed()
      .setTitle(Meme.embed.title)
      .setURL(Meme.embed.url)
      .setImage(Meme.embed.image.url)
      .setFooter(Meme.embed.footer.text)
      .setColor(Meme.embed.color)
      .setTimestamp(Meme.embed.timestamp);
    message.channel.send({ embeds: [embed] });
  },
};
