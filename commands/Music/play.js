'use strict';

require('@lavaclient/queue/register')
const { decode } =require("@lavalink/encoding");
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "play",
    description: "plays music",
    category: "Music",
    memberpermissions:["CONNECT", "SPEAK"],
    cooldown: 5,
    usage: "play <song>",
    run:async(client, message, args)=>{
        const voice_channel = message.member.voice.channel;
        if(!voice_channel){
            return message.channel.send('You need to be in a voice channel')
        }
        if(!message.guild.me.voice.channel){
            return message.channel.send('I am not in a voice channel do b!join or whatever my prefix is')
        }
        if(message.member.voice.channel.id !== message.guild.me.voice.channel.id)return message.channel.send('You are not in the same voice channel as me, join this VC: '+ `<#${message.guild.me.voice.channel.id}>`)
        if(!args[0])return message.channel.send('What song do you want me to do?')
        const results=await client.lavalink.rest.loadTracks(`ytsearch:${args.join(" ")}`)
        let server_queue= client.queue.get(message.guild.id)
        if(!server_queue){
            let player=await client.lavalink.createPlayer(message.guild.id)
            const queue_constructor = {
                voice_channel: message.member.voice.channel,
                player,
                songs: []
            }
            //Add our key and value pair into the global queue. We then use this to get our server queue.
            client.queue.set(message.guild.id, queue_constructor);
            server_queue
            console.log('hello')
            queue_constructor.songs.push(`${results.tracks[0].track}`)

        }else{
            client.queue.get(message.guild.id).songs.push(results.tracks[0].track)
        }
        console.log(client.queue)
        if(!server_queue){
            server_queue=client.queue.get(message.guild.id)
        }
        server_queue.player.queue.add([ results.tracks[0]],{ requester: message.author }); // you can pass the requester in the second parameter
        if (!server_queue.player.playing) {
            server_queue.player.queue.start();
        }
        let embed=new MessageEmbed()
        .setTitle('Now Playing')
        .addField('Now Playing:', server_queue.player.queue.current.title)
        .setColor('GREEN');
        if(server_queue.player.queue.tracks.length > 0){
           embed.addField('Next Song',`${server_queue.player.queue.tracks[0].title}` ) 
        }
        if(server_queue.player.playing){
            message.channel.send(`Added to queue:  \`${results.tracks[0].info.title}\` `)
        }
        message.channel.send({embeds:[embed]})

    },
};