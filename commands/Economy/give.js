const mongoCurrency = require('discord-mongo-currency');
module.exports = {
    name: "donate",
    aliases: ["give"],
    description: "donate your YBCs to someone else",
    category: "Economy",
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 10,
    usage: "give <user>",
    run:async(client, message, args)=>{
        const member=message.mentions.members.first()
        let guild=message.guild.id
        args[0]=member
        let coins=args[1]
        if(!member)return message.channel.send('Who are you giving the coins to?')
        if(!coins)return message.channel.send('How many coins are you giving?')
        await mongoCurrency.giveCoins(member.id, guild, coins)
        message.lineReply(`You have given ${member}, ${coins}YBCs`)
        await mongoCurrency.deductCoins(message.author.id, message.guild.id, coins)
        message.lineReply(`${coins}YBCs have been deducted from you`)
    },
};