const { MessageEmbed } = require("discord.js");
const {reply}=require('../../exports')

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
        await client.guilds.cache.some(guild=>{
            embed.addField('Server:', `${guild.name}`, true)
        })
        reply("I have sent a DM as the server name may be explicit \n If you don't recieve the DM make sure your DMs are open", true, message)
        user.send({embeds:[embed]})
    },
};