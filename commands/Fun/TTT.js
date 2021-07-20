const djsGames = require('djs-games')
module.exports = {
    name: "ttt",
    description: "Starts a game of tic tac toe",
    category: "Fun",
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 10,
    usage: "TTT <opponent>",
    run:async(client, message, args)=>{
        message.lineReply('Starting Game')
        const TicTacToe = new djsGames.TicTacToe()
         TicTacToe.startGame(message)
    
        




    },
};