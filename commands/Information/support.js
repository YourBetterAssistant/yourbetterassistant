'use strict';

const {reply}=require('../../exports')
module.exports = {
    name: "support",
    description: "Sends support server link",
    category: "Information",
    guildOnly: true,
    memberpermissions:"VIEW_CHANNEL",
    adminPermOverride: true,
    cooldown: 5,
    usage: "support",
    run:async(client, message, args)=>{
        const guild=await client.guilds.cache.get('879927834058043492')//Replace the id with the support server of your bot
        const inv=await guild.invites.create(guild.rulesChannelId)//if the rules does not exist replace it with your rules channel id
        reply(`${inv}`, true, message)
    },
};