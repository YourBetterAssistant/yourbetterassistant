"use strict";

module.exports = {
  name: "leave",
  description: "Leaves a voice channel",
  category: "Music",
  memberpermissions: ["CONNECT", "SPEAK"],
  adminPermOverride: true,
  cooldown: 2,
  usage: "leave",
  run: async (client, message) => {
    if (!message.guild.me.voice.channel) {
      return message.channel.send("I am not in a vc ");
    }
    if (!message.member.voice.channel.id === message.guild.me.voice.channel.id)
      return message.channel.send(
        "To run this command you need to be in the same voice channel"
      );
    let server_queue = client.queue.get(message.guild.id);
    try {
      await server_queue.player.disconnect();
      await server_queue.player.destroy();
      await client.queue.delete(message.guild.id);
      await message.reply("I have left");
    } catch (err) {
      return message.reply("An error occured try to disconenct me manually");
    }
  },
};
