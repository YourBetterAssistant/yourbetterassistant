const money=require('../../Constructors/economy')
const Discord=require('discord.js')
const {reply}=require('../../exports')
const currency= new money()
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
            const user = await currency.findUser(member.id); // Get the user from the database.
            if(!user){
                await currency.createUser(member.id, 10000, 10000, 10000)
                reply('A new account has been created for you with a balance of 1000YBCs', true, message)
                await currency.addCoins(member.id, 10000, message)
                return}
            const embed = new Discord.MessageEmbed()
            embed.setTitle(`Your Balance`)
            embed.addFields(
            {name:'Wallet', value:`${user.coins}`},
            {name:'Bank', value:`${user.bank}/${user.bankSpace}`},
            {name:'Total', value:`${user.coins+user.bank}`}
            )
            embed.setColor('RANDOM')
            message.channel.send({embeds:[embed]})
        }
        else{
            const user = await currency.findUser(member.id); // Get the user from the database.
            if(!user){
                await currency.createUser(member.id, 10000, 10000, 10000)
                let mony='10,000'
                message.reply(`A new account has been created for you with a balance of ${mony}YBCs`, true, message)
                return}

            const embed = new Discord.MessageEmbed()
            .setTitle(`${member.user.username}'s Balance`)
            .addFields(
                {name:'Wallet', value:`${user.coins}`, inline:true},
                {name:'Bank', value:`${user.bank}/${user.bankSpace}`, inline:true},
                {name:'Total', value:`${user.bank + user.coins}`, inline:true}
                )
            .setColor('RANDOM')

            reply({embeds:[embed]}, true, message)}

    }
  
};