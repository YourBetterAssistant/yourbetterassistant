const { MessageEmbed } = require("discord.js");
const { duration } = require("../../handlers/functions");
const economySchema = require("../../Schemas/economySchema");

module.exports = {
    name: "daily",
    description: "Get your daily YBCs",
    category: "Economy",
    guildOnly: true,
    memberpermissions:"VIEW_CHANNEL",
    adminPermOverride: true,
    cooldown: 60*60*24,
    usage: "daily",
    run:async(client, message, args)=>{
        let db=await economySchema.findOne({userID:message.author.id})
        await economySchema.updateOne({userID:message.author.id},{
            coins:db.coins+50000
        })
        const embed=new MessageEmbed()
        .setTitle('You have gotten 50,000YBCs!')
        .setDescription('Redeem again in 24 hours!')
        .setColor('GREEN')
        message.channel.send({embeds:[embed]})

    },
};
