'use strict';

const { reply } = require('../../exports');

module.exports = {
    name: "snake",
    description: "snake game",
    category: "Fun",
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 5,
    usage: "snake",
    run:async(client, message, args)=>{
        reply("Starting", true, message)
        const djsGames = require('djs-games')
        const SnakeGame = new djsGames.SnakeGame()
        SnakeGame.startGame(message)
    },
};