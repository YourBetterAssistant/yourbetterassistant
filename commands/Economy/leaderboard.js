const money=require('../../Constructors/economy')
const currency=new money()
module.exports = {
    name: "leaderboard",
    description: "Currency Leaderboard first q0",
    category: "Economy",
    memberpermissions:"VIEW_CHANNEL",
    usage: "leaderboard",
    run:async(client, message, args)=>{
        return message.channel.send('This feature has not been implemented yet')
        const { MessageEmbed } = require('discord.js');
    
        const leaderboard = await currency.generateLeaderboard(10);
        
        if (leaderboard.length < 1) return message.channel.send("Nobody's on the leaderboard.");
        
        const mappedLeaderboard = leaderboard.map(i => `${client.users.cache.get(i.userId).tag ? client.users.cache.get(u.userId).tag : "Nobody"} - ${i.coinsInWallet}`);
        
        const embed = new MessageEmbed()
        .setTitle(`Leaderboard`)
        .setDescription(`${mappedLeaderboard.join('\n')}`)
        .setColor('RANDOM');
        
        message.channel.send({embeds:embed});
    },
};