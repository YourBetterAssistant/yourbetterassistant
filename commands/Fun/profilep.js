module.exports = {
    name: "profilepic",
    category: "Fun",
    cooldown: 1,
    aliases: ["picture"],
    usage: "profilepic <username>",
    description: "gets the profile pic of the person asked",
    run : async(client, message, args)=>{
        if (!args[0]){
            message.channel.send(message.author.displayAvatarURL())

        }else if(args[0]){
            let user=message.mentions.users.first()
            message.channel.send(user.displayAvatarURL())
        }


    },
};