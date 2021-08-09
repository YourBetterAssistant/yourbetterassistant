
const mongoCurrency=require('discord-mongo-currency-fork')
const Discord=require('discord.js')
const {reply}=require('../../exports')
module.exports = {
    name: "deposit",
    aliases: ["dep"],
    description: "deposits YMCs to the bank",
    category: "Economy",
    guildOnly: true,
    memberpermissions:"VIEW_CHANNEL",
    adminPermOverride: true,
    cooldown: 5,
    usage: "deposit <amount>",
    run:async(client, message, args)=>{
        if(!isNaN(args[0])) return message.channel.send('That is not a real number')
        let coins=args[0]
        let user=message.author
        let guild=message.guily
        reply({content:`Depositing ${coins}YMCs right now!`, allowedMentions:{repliedUser:true}})
        mongoCurrency.deposit(user.id, guild.id, coins)
        
    },
};