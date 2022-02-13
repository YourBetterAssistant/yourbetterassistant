"use strict";

import { Client, Message } from "discord.js";

module.exports = {
  name: "join",
  description: "Joins a voice channel",
  category: "Music",
  guildOnly: true,
  memberpermissions: ["CONNECT", "SPEAK"],
  cooldown: 5,
  usage: "join",
  run: async (client: Client, message: Message, args: string[]) => {
    let server_queue = client.queue.get(message.guild?.id!);
    if (!server_queue) {
      let player = await client.lavalink.createPlayer(message.guild?.id!);
      const queue_constructor = {
        voice_channel: message.member?.voice.channel,
        player,
        songs: [] as any[],
      };
      //Add our key and value pair into the global queue. We then use this to get our server queue.
      client.queue.set(message.guild?.id!, queue_constructor);
      server_queue;
      console.log("hello");
    }
    if (!server_queue) {
      server_queue = client.queue.get(message.guild?.id!);
    }
    const voice_channel = message.member?.voice.channel;
    if (!voice_channel) {
      return message.channel.send("You need to be in a voice channel");
    }
    if (!message.guild?.me?.voice.channel) {
      server_queue.player.connect(message.member.voice.channel.id);
      message.reply("I have joined");
    } else {
      return message.channel.send(
        "I am already in a voiceChannel join that voicechannel"
      );
    }
  },
};
