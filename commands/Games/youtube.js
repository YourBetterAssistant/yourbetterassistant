const {DiscordTogether}=require('discord-together')
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
        if(!message.member.voice.channel)return message.lineReply('You need to be in a VC')
        client.discordTogether.createTogetherCode(message.member.voice.channelID, 'youtube').then(async invite => {
            return message.channel.send(`${invite.code}`);
    })
}}