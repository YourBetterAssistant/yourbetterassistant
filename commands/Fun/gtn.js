const {reply}=require('../../exports')

module.exports = {
    name: "gtn",
    aliases: ["guessthenumber"],
    description: "guess the number game",
    memberpermissions:"VIEW_CHANNEL",
    adminPermOverride: true,
    cooldown: 2,
    usage: "gtn",
    run:async(client, message, args)=>{
        reply("Starting Game", true, message)
        const djsGames = require('djs-games')
        const guessTheNumber = new djsGames.GuessTheNumber()
         guessTheNumber.startGame(message)
    },
};