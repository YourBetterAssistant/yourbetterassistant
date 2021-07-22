module.exports = {
    name: "work",
    description: "work ",
    category: "category",
    guildOnly: true,
    memberpermissions:"VIEW_CHANNEL",
    adminPermOverride: true,
    cooldown: 2,
    args: args,
    usage: "<usage>",
    run:async(client, message, args)=>{
        message.reply("IN PROGRESS!")
    },
};