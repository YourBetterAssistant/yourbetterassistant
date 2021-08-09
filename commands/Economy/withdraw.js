const mongoCurrency=require('discord-mongo-currency-fork')
const {reply}=require('../../exports')
module.exports = {
    name: "withdraw",
    aliases: ["with"],
    description: "withdraw money",
    category: "Economy",
    guildOnly: true,
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 10,
    usage: "withdraw <amount>",
    run:async(client, message, args)=>{
        if(!isNaN(args[0])) return message.channel.send('That is not a real number')
        let coins=args[0]
        let user=message.author
        let guild=message.guild
        reply(`Withdrawing ${coins}YMCs from the bank!`, true, message)
        mongoCurrency.withdraw(user.id, guild.id, coins)

    },
};