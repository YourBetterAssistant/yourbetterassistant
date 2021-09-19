const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "queue",
    aliases: ["q"],
    description: "Shows the current queue",
    category: "Music",
    guildOnly: true,
    memberpermissions:["CONNECT", "SPEAK"],
    adminPermOverride: true,
    cooldown: 5,
    usage: "queue",
    run:async(client, message, args)=>{
        const server_queue = client.queue.get(message.guild.id)
        if(!server_queue)return message.channel.send('This server does not have a queue, start playing music to use this command')
        if(!message.member.voice.channel.id===message.guild.me.voice.channel.id)return message.channel.send(`Join <#${message.guild.me.voice.channel.id}> to use this command `)
        let embed=new MessageEmbed()
        .setTitle('Queue')
        .setColor('BLUE')
        .addField('Now Playing', `${server_queue.player.queue.current.title}`)
        let i=1
        if(server_queue.player.queue.tracks.length > 0){
            embed.addField('Next Song',`${server_queue.player.queue.tracks[0].title}` ) 
         }
        server_queue.player.queue.tracks.forEach(track=>embed.addField(`Song ${i++}`, `${track.title}`, inline=false))
        message.reply({embeds:[embed]})
    },
};