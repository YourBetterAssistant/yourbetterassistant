'use strict';

module.exports = {
    name: "pause",
    description: "Pauses the song",
    category: "Music",
    guildOnly: true,
    memberpermissions:["CONNECT", "SPEAK"],
    cooldown: 3,
    usage: "pause",
    run:async(client, message, args)=>{
       const server_queue=client.queue.get(message.guild.id)
       if(!server_queue){
           return message.reply('This server has no current songs playing nor am I connected to a vc')
       }
       if(!message.guild.me.voice.channel.id===message.member.voice.channel.id)return message.channel.send('You are not in the same vc')
       server_queue.player.pause()
       message.reply('The song has been paused')
    },
};