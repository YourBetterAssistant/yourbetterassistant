import { Client, Message } from "discord.js";

export default {
  name: "skip",
  description: "skips a song",
  category: "Music",
  guildOnly: true,
  memberpermissions: ["VIEW_CHANNEL", "CONNECT", "SPEAK"],
  cooldown: 5,
  usage: "skip",
  run: async (client: Client, message: Message, args: string[]) => {
    const server_queue = client.queue.get(message.guild?.id!);
    if (
      message.guild?.me?.voice.channel?.id !== message.member?.voice.channel?.id
    )
      return message.channel.send("You are not in the same vc");
    if (!server_queue) {
      return message.reply(
        "This server has no current songs playing nor am I connected to a vc"
      );
    }
    server_queue.player.queue.next();
  },
};
