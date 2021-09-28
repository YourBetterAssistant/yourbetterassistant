'use strict';

module.exports = {
    name: "leave",
    description: "Leaves a voice channel",
    category: "Music",
    memberpermissions:["CONNECT", "SPEAK"],
    adminPermOverride: true,
    cooldown: 2,
    usage: "leave",
    run:async(client, message, args) =>{
        if(!message.guild.me.voice.channel){
            return message.channel.send('I am not in a vc ')
        }
        if(!message.member.voice.channel.id===message.guild.me.voice.channel.id) return message.channel.send('To run this command you need to be in the same voice channel')
        let server_queue= client.queue.get(message.guild.id)
        server_queue.player.disconnect()
        server_queue.player.destroy()
        client.queue.delete(message.guild.id)
        message.reply('I have left')
    },
};