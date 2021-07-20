const shell = require("shelljs");

module.exports = {
    name: "restart",
    description: "restarts bot",
    category: "OWNER",
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 2,
    usage: "restart",
    run:async(client, message, args)=>{
        if(!message.author.id===827388013062389761) return message.channel.send('No you are not owner')
        message.reply('Restarting =]')
        shell.exec('sudo reboot')

    },
};