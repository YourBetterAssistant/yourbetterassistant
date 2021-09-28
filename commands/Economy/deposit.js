'use strict';

const Discord=require('discord.js');
const money=require('../../Constructors/economy')
const currency =new money()
const {reply}=require('../../exports');
const economySchema = require('../../Schemas/economySchema');
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
        let coins=args[0]
        let user=message.author
        reply(`Withdrawing ${coins}YMCs from the bank!`, true, message)
        if(coins==='all'??coins==='.'??coins==='*'??coins==='max'){await currency.deposit(user.id,coins, message);return}
        if(isNaN(coins)){return reply('that is not a number')}
        await currency.deposit(user.id,coins, message);return

        
    },
};