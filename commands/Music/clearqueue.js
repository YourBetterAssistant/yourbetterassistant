module.exports = {
  name: "clearqueue",
  description: "Clears The Queue",
  category: "Music",
  guildOnly: true,
  memberpermissions: ["VIEW_CHANNEL", "CONNECT"],
  cooldown: 5,
  usage: "clearqueue",
  run: async (client, message) => {
    const server_queue = client.queue.get(message.guild.id);
    if (!server_queue) {
      return message.reply(
        "This server has no current songs playing nor am I connected to a vc"
      );
    }
    if (message.guild.me.voice.channel.id !== message.member.voice.channel.id)
      return message.channel.send("You are not in the same vc");
    server_queue.player.queue.tracks.length = 0;
    message.channel.send("I have cleared the queue!");
  },
};
