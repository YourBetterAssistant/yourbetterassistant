import { Client, Message, MessageEmbed } from "discord.js";

module.exports = {
  name: "previous",
  description: "Plays the previous song",
  category: "Music",
  memberpermissions: ["VIEW_CHANNEL", "CONNECT", "SPEAK"],
  cooldown: 5,
  usage: "previous",
  run: async (client: Client, message: Message, args: string[]) => {
    let server_queue = client.queue.get(message.guild?.id!);
    if (!server_queue) {
      return message.reply(
        "This server has no current songs playing nor am I connected to a vc"
      );
    }
    if (
      message.guild?.me?.voice.channel?.id !== message.member?.voice.channel?.id
    )
      return message.channel.send("You are not in the same vc");
    if (!server_queue) {
      server_queue = client.queue.get(message.guild?.id!);
    }
    if (!server_queue.player.queue.previous[0])
      return message.channel.send("There Were No Previous Songs Playing");
    server_queue.player.queue.add([server_queue.player.queue.previous[0]], {
      requester: message.author,
    }); // you can pass the requester in the second parameter
    let embed = new MessageEmbed()
      .setTitle("Now Playing")
      .addField("Now Playing:", server_queue.player.queue.current.title)
      .setColor("GREEN");
    if (server_queue.player.queue.tracks.length > 0) {
      embed.addField(
        "Next Song",
        `${server_queue.player.queue.tracks[0].title}`
      );
    }
    if (server_queue.player.playing) {
      message.channel.send(
        `Added to queue:  \`${server_queue.player.queue.previous[0].title}\` `
      );
    }
    message.channel.send({ embeds: [embed] });
  },
};
