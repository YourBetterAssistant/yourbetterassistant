const {DiscordTogether}=require('discord-together')
import {reply} from '../../index'
module.exports = {
    name: "betrayal",
    description: "Play betrayal with your buds",
    category: "Games",
    guildOnly: true,
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 10,
    usage: "betrayal",
    run:async(client, message, args)=>{
        client.discordTogether = new DiscordTogether(client);
        if(!message.member.voice.channel)return reply('You need to be in a VC', true, message)
        client.discordTogether.createTogetherCode(message.member.voice.channelID, 'betaryal').then(async invite => {
            return message.channel.send(`${invite.code}`);
    })
}}
