const { ClientApplication } = require('discord.js');
const shell=require('shelljs')
module.exports = {
    name: "cmd",
    description: "NO",
    category: "OWNER",
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 2,
    usage: "No",
    run:async(client, message, args)=>{
        if(!message.author===ClientApplication.owner)return
        const cmd = args.slice(1).join(" ")
        message.channel.send('Executing')
        shell.exec(cmd)
    }
};