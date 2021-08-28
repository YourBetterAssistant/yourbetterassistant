const { ClientApplication } = require("discord.js");
const shell = require("shelljs");
const {reply}=require('../../exports')

module.exports = {
    name: "restart",
    aliases:'reboot',
    description: "restarts bot",
    category: "OWNER",
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 2,
    usage: "restart",
    run:async(client, message, args)=>{
        if(!message.author.id==='827388013062389761') return message.channel.send('No you are not owner')
        await reply('Restarting', true, message)
        await shell.exec('pm2 restart 0')

    },
};