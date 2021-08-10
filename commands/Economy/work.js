const Discord=require('discord.js')
const mongoCurrency=require('discord-mongo-currency-fork')
const {reply}=require('../../exports')
const workSchema=require('../../Schemas/workSchema')
const mongo=require('../../botconfig/mongo')
module.exports = {
    name: "work",
    description: "work ",
    category: "Economy",
    guildOnly: true,
    memberpermissions:"VIEW_CHANNEL",
    adminPermOverride: true,
    cooldown: 60*60*1,
    usage: "work",
    run:async(client, message, args)=>{
        let job
        await mongo().then(async mongoose=>{
          try{
          let j=await workSchema.findOne({
            guildID:message.guild.id,
            userID:message.author.id
          })
          if(!j){
            reply('You do not have a job here is compensation, 1000YBCs I highly suggest getting one')
            await mongoCurrency.giveCoins(msg.author.id, msg.guild.id, 1000)
            return
          }
          job=j.job}catch(err){console.log(" erro smh")}
        })
        let possibleJobs=['FRIDGE', 'BUY', 'JOBS', 'TV', 'POLITICS', 'LIFE', 'CHILDREN']
        var item = possibleJobs[Math.floor(Math.random()*possibleJobs.length)];
        let embed=new Discord.MessageEmbed()
        .setTitle(`JOB:${job}`)
        .setDescription('Type the word in')
        .addField('Word:',`${item}`, true)
        message.channel.send({embeds:[embed]})
        const randomCoins = Math.floor(Math.random() * 500) + 1;
        let filter = m => m.author.id === message.author.id
        message.channel.awaitMessages({
            filter,
            max: 1,
            time: 10000,
            errors: ['time']
          }).then(msg=>{
            msg = msg.first()
            console.log('Why ')
            if (msg.content.startsWith(item)) {
              console.log('k')
              msg.channel.send(`CORRECT YOU HAVE EARNT 1000YBCs`)
              await mongoCurrency.giveCoins(msg.author.id, msg.guild.id, 1000)
              return

            } else {
              msg.channel.send(`WRONG! YOU HAVE EARNT ${randomCoins}YBCs`)}
              await mongoCurrency.giveCoins(msg.author.id, msg.guild.id, randomCoins)
              return

          }).catch((collected)=>{
            let msg=message
            msg.channel.send(`TIMES UP! YOU HAVE EARNT ${randomCoins}YBCs`)
            await mongoCurrency.giveCoins(msg.author.id, msg.guild.id, randomCoins)
            return

          })
        


    },
};