module.exports = {
    name: "snake",
    description: "snake game",
    category: "Fun",
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 5,
    usage: "snake",
    run:async(client, message, args)=>{
        message.lineReply("Starting")
        const djsGames = require('djs-games')
        const SnakeGame = new djsGames.SnakeGame()
        SnakeGame.startGame(message)
    },
};