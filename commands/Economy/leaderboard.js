
module.exports = {
    name: "richlist",
    aliases: ["rich"],
    description: "Shows the rich people of your server!",
    category: "Economy",
    guildOnly: true,
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 5,
    usage: "richlist",
    run:async(client, message, args)=>{
        const mongoCurrency = require('discord-mongo-currency');
    const { MessageEmbed } = require('discord.js');
    
    const leaderboard = await mongoCurrency.generateLeaderboard(message.guild.id, 10);
    
    if (leaderboard.length < 1) return message.channel.send("Nobody's on the leaderboard.");
    
    const mappedLeaderboard = leaderboard.map(i => `${client.users.cache.get(i.userId).tag ? client.users.cache.get(u.userId).tag : "Nobody"} - ${i.coinsInWallet}`);
    
    const embed = new MessageEmbed()
    .setTitle(`${message.guild.name}\'s Leaderboard`)
    .setDescription(`${mappedLeaderboard.join('\n')}`);
    
    message.channel.send(embed);
    },
};