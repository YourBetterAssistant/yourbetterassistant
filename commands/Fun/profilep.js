const Discord=require('discord.js')
module.exports = {
    name: "profilepic",
    category: "Fun",
    cooldown: 1,
    aliases: ["picture"],
    usage: "profilepic <username>",
    description: "gets the profile pic of the person asked",
    run : async(client, message, args)=>{
        let embed=new Discord.MessageEmbed().setColor('RANDOM')
        if (!args[0]){
            embed.setImage(message.author.displayAvatarURL())
            message.channel.send(embed)

        }else if(args[0]){
            let user=message.mentions.users.first()
            embed.setImage(user.displayAvatarURL())
            message.channel.send(embed)
        }


    },
};