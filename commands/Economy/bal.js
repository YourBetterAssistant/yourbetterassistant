const economy=require('../../handlers/economy')
const Discord=require('discord.js')
const mongoCurrency=require('discord-mongo-currency-fork')
module.exports = {
    name: "bal",
    aliases: ["balance"],
    description: "shows your balance",
    category: "Economy",
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 5,
    usage: "bal [user]",
    run:async(client, message, args)=>{
        let member=message.mentions.members.first()
        if(!args[0]){

            let member=message.author
            const user = await mongoCurrency.findUser(member.id, message.guild.id); // Get the user from the database.
            const embed = new Discord.MessageEmbed()
        .setTitle(`Your Balance`)
        .addFields(
            {name:'Wallet', value:user.coinsInWallet},
            {name:'Bank', value:`${user.coinsInBank}/${user.bankSpace}`},
            {name:'Total', value:user.coinsInBank + user.coinsInWallet}
            )
        .setColor('RANDOM')
        if(!user){
            mongoCurrency.createUser(message.author.id, message.guild.id)
            message.lineReply('A new account has been created for you with a balance of 1000YBCs')
            mongoCurrency.giveCoins(message.author.id, message.guild.id, 1000)
            return}
        message.channel.send({embeds:embed})
        }
        else{

        const user = await mongoCurrency.findUser(member.id, message.guild.id); // Get the user from the database.

        const embed = new Discord.MessageEmbed()
        .setTitle(`${member.user.username}'s Balance`)
        .addFields(
            {name:'Wallet', value:user.coinsInWallet},
            {name:'Bank', value:`${user.coinsInBank}/${user.bankSpace}`},
            {name:'Total', value:user.coinsInBank + user.coinsInWallet}
            )
        .setColor('RANDOM')
        if(!user){
            mongoCurrency.createUser(member.id, message.guild.id)
            message.lineReply('A new account has been created for you with a balance of 1000YBCs')
            mongoCurrency.giveCoins(member.id, message.guild.id, 1000)
            return}

        message.lineReply({embeds:embed})}

    }
  
};