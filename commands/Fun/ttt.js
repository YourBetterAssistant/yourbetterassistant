const djsGames = require('djs-games')
const TicTacToe = new djsGames.TicTacToe()
const {reply}=require('../../exports')
module.exports = {
    name: "ttt",
    aliases: ["tictactoe"],
    description: "plays tic tac toe",
    category: "Fun",
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 10,
    usage: "ttt <user>",
    run:async(client, message, args)=>{
        const opponent = message.mentions.users.first();
        if (!opponent) return message.channel.send('**Mention someone**')
        
        reply('Starting', true, message)
        TicTacToe.startGame(message)

    },
};