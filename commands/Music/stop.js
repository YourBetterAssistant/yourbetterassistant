module.exports = {
    name: "stop",
    description: "Stops The Music Player",
    category: "Music",
    memberpermissions:["VIEW_CHANNEL", "CONNECT", "SPEAK"],
    cooldown: 5,
    usage: "stop",
    run:async(client, message, args)=>{
        const server_queue=client.queue.get(message.guild.id)
        if(!server_queue){
            return message.reply('This server has no current songs playing nor am I connected to a vc')
        }
        if(!message.guild.me.voice.channel.id===message.member.voice.channel.id)return message.channel.send('You are not in the same vc')
        server_queue.player.stop()
    },
};