const {DiscordTogether}=require('discord-together')
import {reply} from '../../index'
module.exports = {
    name: "poker",
    description: "Play poker with your buds NOTE:This only works if you are 18+",
    category: "Games",
    guildOnly: true,
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 10,
    usage: "poker",
    run:async(client, message, args)=>{
        client.discordTogether = new DiscordTogether(client);
        if(!message.member.voice.channel)return reply('You need to be in a VC', true, message)
        client.discordTogether.createTogetherCode(message.member.voice.channelID, 'poker').then(async invite => {
            return message.channel.send(`${invite.code}`);
    })
}}
