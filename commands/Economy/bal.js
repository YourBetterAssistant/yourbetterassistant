
const Discord=require('discord.js')
const mongoCurrency=require('discord-mongo-currency-fork')
const {reply}=require('../../exports')
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
            if(!user){
                await mongoCurrency.createUser(message.author.id, message.guild.id)
                reply('A new account has been created for you with a balance of 1000YBCs', true, message)
                await mongoCurrency.giveCoins(message.author.id, message.guild.id, 1000)
                return}
            const embed = new Discord.MessageEmbed()
            embed.setTitle(`Your Balance`)
            embed.addFields(
            {name:'Wallet', value:`${user.coinsInWallet}`},
            {name:'Bank', value:`${user.coinsInBank}/${user.bankSpace}`},
            {name:'Total', value:`${user.coinsInBank+user.coinsInWallet}`}
            )
            embed.setColor('RANDOM')
            message.channel.send({embeds:[embed]})
        }
        else{

        const user = await mongoCurrency.findUser(member.id, message.guild.id); // Get the user from the database.

        const embed = new Discord.MessageEmbed()
        .setTitle(`${member.user.username}'s Balance`)
        .addFields(
            {name:'Wallet', value:`${user.coinsInWallet}`, inline:true},
            {name:'Bank', value:`${user.coinsInBank}/${user.bankSpace}`, inline:true},
            {name:'Total', value:`${user.coinsInBank} + ${user.coinsInWallet}`, inline:true}
            )
        .setColor('RANDOM')
        if(!user){
            await mongoCurrency.createUser(member.id, message.guild.id)
            message.reply('A new account has been created for you with a balance of 1000YBCs', true, message)
            await mongoCurrency.giveCoins(member.id, message.guild.id, 1000)
            return}

        reply({embeds:[embed]}, true, message)}

    }
  
};