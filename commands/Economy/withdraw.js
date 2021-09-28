'use strict';

const money=require('../../Constructors/economy')
const economy=new money()
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
        //if(isNaN(args[0])) return message.channel.send('That is not a real number')
        let coins=args[0]
        let user=message.author
        reply(`Withdrawing ${coins}YMCs from the bank!`, true, message)
        if(coins==='all'){await economy.withdraw(user.id,coins, message);return}
        if(isNaN(coins)){return reply('that is not a number')}
        await economy.withdraw(user.id,coins, message);return
        

    },
};