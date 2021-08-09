const {DiscordTogether}=require('discord-together')
const {reply}=require('../../exports')
module.exports = {
    name: "fishing",
    description: "Play fishing with your buds",
    category: "Games",
    guildOnly: true,
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 10,
    usage: "fishing",
    run:async(client, message, args)=>{
        client.discordTogether = new DiscordTogether(client);
        if(!message.member.voice.channel)return reply('You need to be in a VC', true, message)
        client.discordTogether.createTogetherCode(message.member.voice.channelID, 'fishing').then(async invite => {
            return message.channel.send(`${invite.code}`);
    })
}}
