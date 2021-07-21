const games = require('dj-games')
const typer = new games.typer()
module.exports = {
    name: "typer",
    description: "typer game",
    category: "Fun",
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 2,
    usage: "typer",
    run:async(client, message, args)=>{
        message.lineReply("Startinf Game")
        typer.startGame(message)
    },
};