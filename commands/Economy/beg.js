const mongoCurrency=require('discord-mongo-currency-fork')
module.exports = {
    name: "beg",
    description: "beg for YBCs",
    category: "Economy",
    guildOnly: true,
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 20,
    usage: "beg",
    run:async(client, message, args)=>{
        const randomCoins = Math.floor(Math.random() * 99) + 1; // Random amount of coins.
        await mongoCurrency.giveCoins(message.member.id, message.guild.id, randomCoins);
        message.lineReply(`You have gotten ${randomCoins}YBCs from begging!`)
        
        
    },
};