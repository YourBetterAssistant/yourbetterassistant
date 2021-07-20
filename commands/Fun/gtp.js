module.exports = {
    name: "gtp",
    aliases: ["guessthatpokemom"],
    description: "guess that pokemon",
    category: "Fun",
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 10,
    usage: "gtp",
    run:async(client, message, args)=>{
        const { Pokemon } = require('djs-games')
        const game = new Pokemon({
        message: message,
        token: "dagpi-token-here", // Get Your Api Token at https://dagpi.xyz/dashboard
        })
        game.start()
    },
};