const gottem=require('djs-meme')
module.exports = {
    name: "meme",
    description: "sends a meme",
    category: "Fun",
    guildOnly: true,
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 5,
    usage: "meme",
    run:async(client, message, args)=>{
        const Meme = await gottem.meme();
        return message.channel.send(Meme);
    },
};