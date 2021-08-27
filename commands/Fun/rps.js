const {reply}=require('../../exports')
module.exports = {
    name: "rps",
    description: "Rock paper Scissors",
    category: "Fun",
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 5,
    usage: "rps",
    run:async(client, message, args)=>{
        reply('Starting Game', true, message)
        const djsGames = require('djs-games')
        const RockPaperScissors = new djsGames.RockPaperScissors()
        RockPaperScissors.startGame(message)
    },
};