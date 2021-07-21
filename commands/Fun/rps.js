const djsGames = require('djs-games')
const RockPaperScissors = new djsGames.RockPaperScissors()
module.exports = {
    name: "rps",
    aliases: ["rockpaperscissors"],
    description: "Plays rock paper scissors with you",
    category: "Fun",
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 10,
    usage: "rps <opponent>",
    run:async(client, message, args) =>{
        message.lineReply('Starting Game...')
        RockPaperScissors.startGame(message)

    },
};