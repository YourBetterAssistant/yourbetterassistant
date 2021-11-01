'use strict';

const Discord=require('discord.js')
const workSchema=require('../../Schemas/workSchema')
const id=require('../../botconfig/id.json')
const s=require('../../botconfig/salary.json')
const money=require('../../Constructors/economy')
const { default: axios } = require('axios')
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
    run:async(client, message)=>{
        let job
          try{
          let j=await workSchema.findOne({
            userID:message.author.id,
          })
          if(!j){
            return message.reply('You do not have a job! Run b!hire')
          }else
          job=j.job}
          catch(err){return message.channel.send('Error Has Occured Try Again Later')}
        if(!job){
          message.reply('You do not have a job! Run b!hire')
        }
        let salary1=s[1]
        let salary2=s[2]
        let salary3=s[3]
        let possibleJobs=[]
        await axios.get('https://random-word-api.herokuapp.com/word?number=1').then((val)=> possibleJobs.push(val.data.toString()))
        console.log(possibleJobs[0])
        let embed=new Discord.MessageEmbed()
        .setTitle(`JOB:${job}`)
        .setDescription('Type the word in')
        .addField('Word:',`${possibleJobs[0]}`, true)
        .setColor('GREEN')
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
          if(msg.content===possibleJobs[0]){
              console.log('k')
              msg.channel.send(`CORRECT YOU HAVE EARNT ${sal}YBCs`)
              economy.addCoins(msg.author.id,parseInt(sal), msg)
              return
  
            }else {
              msg.channel.send(`WRONG! YOU HAVE EARNT ${randomCoins}YBCs`)}
              economy.addCoins(msg.author.id,randomCoins, msg)
              return
          }).catch(err=>{
            if(err){
              message.channel.send(`Sed time ran out here is ${randomCoins}YBCs`)
              economy.addCoins(message.author.id,randomCoins, message)
              return console.log(err)
            }
          })
        
        

    },
};