'use strict';

const {DiscordTogether}=require('discord-together')
const {reply}=require('../../exports')
module.exports = {
    name: "youtube",
    description: "Play youtube with your buds",
    category: "Games",
    guildOnly: true,
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 10,
    usage: "youtube",
    run:async(client, message, args)=>{
        client.discordTogether = new DiscordTogether(client);
        if(!message.member.voice.channel)return reply('You need to be in a VC', true, message)
        client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'youtube').then(async invite => {
            return message.channel.send(`${invite.code}`);
    })
}}
