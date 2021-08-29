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
        let ownerId='827388013062389761'
        if(!message.author.id===ownerId){
            message.channel.send('You cannot pull');
            console.log('bruh')
            return
        }
        await reply('Restarting', true, message)
        await shell.exec('pm2 restart 0')

    },
};