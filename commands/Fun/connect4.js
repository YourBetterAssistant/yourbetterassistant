const djsGames = require('djs-games')
const ConnectFour = new djsGames.ConnectFour()
module.exports = {
    name: "connect4",
    aliases: ["c4"],
    description: "plays connect 4",
    category: "Fun",
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 10,
    usage: "connect4 <user>",
    run:async(client, message, args)=>{
        message.lineReply("Starting Game")
        ConnectFour.startGame(message)
    },
};
