'use strict';

module.exports = {
    name: "guessthelogo",
    aliases: ["gtl"],
    description: "Guess the logo",
    category: "Fun",
    guildOnly: true,
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 10,
    usage: "gtl",
    run:async(client, message, args)=>{
        const { GTL } = require('djs-games')
        const game = new GTL({
        message: message,
        token: process.env.DAGPITOKEN, // *Required!! Get Your Api Token at https://dagpi.xyz/dashboard 
        stopCommand: "stop", // *Required!!
        winFooter: "You Win!", // Set The Footer of the win message
        winColor: "GREEN", // The embed color of the win message
        loseFooter: "You Lose!", // Set The Footer of the lose message
        loseColor: "RED", // The embed color of the lose message
        questionFooter: "Guess the Logo!", // Set The Footer of the question message
        questionColor: "BLUE", // The embed color of the question message
        })
        game.start()
    },
};