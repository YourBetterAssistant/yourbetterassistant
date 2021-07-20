const { ClientApplication } = require("discord.js");
const shell = require("shelljs");

module.exports = {
    name: "restart",
    aliases:'reboot',
    description: "restarts bot",
    category: "OWNER",
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 2,
    usage: "restart",
    run:async(client, message, args)=>{
        console.log(ClientApplication.owner)
        if(!ClientApplication.owner) return message.channel.send('No you are not owner')
        message.linereply('Restarting =]')
        shell.exec('sudo reboot')

    },
};