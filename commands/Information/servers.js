const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "servers",
    aliases: ["guilds", "list-guilds"],
    description: "lists the guild names of all the guilds the bot is in",
    category: "Information",
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 20,
    usage: "servers",
    run:async(client, message, args)=>{
        let user=message.author
        let embed=new MessageEmbed()
        .setTitle('Servers')
        .setColor('RANDOM')
        await client.guilds.cache.forEach(guild=>{
            embed.addField('Server:', `${guild.name}`, true)
        })
        
        user.send({embeds:[embed]})
    },
};