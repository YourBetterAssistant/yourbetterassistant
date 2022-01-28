'use strict';

const money=require('../../Constructors/economy')
const economy=new money()
const {reply}=require('../../exports')
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
        await economy.addCoins(message.member.id, randomCoins, message);
        reply(`You have gotten ${randomCoins}YBCs from begging!`, true, message)
        
        
    },
};