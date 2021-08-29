const Discord=require('discord.js')
const {reply}=require('../../exports')
const workSchema=require('../../Schemas/workSchema')
const mongo=require('../../botconfig/mongo')
const id=require('../../botconfig/id.json')
const s=require('../../botconfig/salary.json')
const money=require('../../Constructors/economy')
const economy=new money()
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
            userID:message.author.id,
          })
          if(!j){
            reply('You do not have a job here is compensation, 1000YBCs I highly suggest getting one')
            await economy.addCoins(message.author.id, message.guild.id, '1000')
            return
          }
          job=j.job}catch(err){console.log(" erro smh")}
        })
        let salary1=s[1]
        let salary2=s[2]
        let salary3=s[3]
        let possibleJobs=['FRIDGE', 'BUY', 'JOBS', 'TV', 'POLITICS', 'LIFE', 'CHILDREN']
        var item = possibleJobs[Math.floor(Math.random()*possibleJobs.length)];
        let embed=new Discord.MessageEmbed()
        .setTitle(`JOB:${job}`)
        .setDescription('Type the word in')
        .addField('Word:',`${item}`, true)
        message.channel.send({embeds:[embed]})
        let sal
        if(job===id[1]){sal=salary1}
        else if(job===id[2]){sal=salary2}
        else if(job===id[3]){sal=salary3}
        const randomCoins = Math.floor(Math.random() * 500) + 1;
        let filter = m => m.author.id === message.author.id
        message.channel.awaitMessages({
          filter,
          max:1,
          time:10000,
          errors:['time']
        }).then(async(msg)=>{
          msg = Array.from(msg.values())[0]
          if(msg.content===item){
              console.log('k')
              msg.channel.send(`CORRECT YOU HAVE EARNT ${sal}YBCs`)
              economy.addCoins(msg.author.id,parseInt(sal), msg)
              return
  
            }else {
              msg.channel.send(`WRONG! YOU HAVE EARNT ${randomCoins}YBCs`)}
              mongoCurrency.giveCoins(msg.author.id,randomCoins, msg)
              return
          }).catch(err=>{
            if(err){
              message.channel.send(`Sed time ran out here is ${randomCoins}YBCs`)
              mongoCurrency.giveCoins(msg.author.id,randomCoins, msg)
              return console.log(err)
            }
          })
        
        

    },
};