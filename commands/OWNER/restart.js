const shell = require("shelljs");

module.exports = {
    name: "restart",
    aliases: ["reboot"],
    description: "restarts bot",
    category: "OWNER",
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 2,
    usage: "restart",
    run:async(client, message, args)=>{
        message.reply('Restarting =]')
        shell.exec('sudo reboot')

    },
};