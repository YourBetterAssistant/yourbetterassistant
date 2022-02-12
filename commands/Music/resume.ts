"use strict";

import { Client, Message, MessageEmbed } from "discord.js";

module.exports = {
  name: "resume",
  aliases: ["resume", "unpause"],
  description: "Resumes the song",
  category: "Music",
  guildOnly: true,
  memberpermissions: ["CONNECT", "SPEAK"],
  cooldown: 3,
  usage: "resume",
  run: async (client: Client, message: Message, args: string[]) => {
    const server_queue = client.queue.get(message.guild?.id!);
    if (!server_queue) {
      return message.reply(
        "This server has no current songs playing nor am I connected to a vc"
      );
    }
    if (
      message.guild?.me?.voice.channel?.id !== message.member?.voice.channel?.id
    )
      return message.channel.send("You are not in the same vc");
    server_queue.player.resume();
    let embed = new MessageEmbed()
      .setTitle("Now Playing!")
      .addField("Now Playing:", `${server_queue.player.queue.current.title}`)
      .setColor("YELLOW");
    if (server_queue.player.queue.tracks.length > 0) {
      embed.addField(
        "Next Song",
        `${server_queue.player.queue.tracks[0].title}`
      );
    }
    message.reply("Resumed");
    message.channel.send({ embeds: [embed] });
  },
};
