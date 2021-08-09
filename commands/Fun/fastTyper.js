const {reply}=require('../../exports')
module.exports = {
    name: "fasttyper",
    aliases: ["typer"],
    description: "typer game",
    category: "Fun",
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 10,
    usage: "typer",
    run:async(client, message, args)=>{
        reply("Starting", false, message)
        const djsGames = require('djs-games')
        const FastTyper = new djsGames.FastTyper()
        FastTyper.startGame(message)
    },
};
