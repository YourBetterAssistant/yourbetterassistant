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
        reply('https://discord.gg/jzWdzgg2q6', true, message)
    },
};