'use strict';

const {DiscordTogether}=require('discord-together')
const {reply}=require('../../exports')
module.exports = {
    name: "chess",
    description: "Play chess with your buds",
    category: "Games",
    guildOnly: true,
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 10,
    usage: "chess",
    run:async(client, message)=>{
        client.discordTogether = new DiscordTogether(client);
        if(!message.member.voice.channel)return reply('You need to be in a VC')
        client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'chess').then(async invite => {
            if(invite.code =='https://discord.com/invite/50013')return message.channel.send('An error occured while creating that invite, make sure I have the permission: `CREATE-INVITE` and that this channel allows me to send invites')
            else return message.channel.send(`${invite.code}`);
    })
}}
