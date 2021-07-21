module.exports = {
    name: "gtn",
    aliases: ["guessthenumber"],
    description: "guess the number game",
    memberpermissions:"VIEW_CHANNEL",
    adminPermOverride: true,
    cooldown: 2,
    args: args,
    usage: "<usage>",
    execute(message, args) {
        message.reply("template command")
    },
};