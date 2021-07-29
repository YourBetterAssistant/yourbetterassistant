//here the event starts
const config = require("../../botconfig/config.json")
const commandBase=require('../guild/message')
const Discord=require('discord.js')
require('dotenv').config()
const mongoCurrency = require('discord-mongo-currency-fork');
const mongoose=require('mongoose')
const welcomeSchema=require('../../Schemas/welcomeSchema')
const Levels = require("discord-xp");

const mongo=require('../../botconfig/mongo')
module.exports = async client => {
  try{
    const stringlength = 69;
    console.log("\n")
    console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + `Discord Bot is online!`.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length-`Discord Bot is online!`.length)+ "┃".bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + ` /--/ ${client.user.tag} /--/ `.bold.brightGreen+ " ".repeat(-1+stringlength-` ┃ `.length-` /--/ ${client.user.tag} /--/ `.length)+ "┃".bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃".bold.brightGreen)
    console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)
  }catch{ /* */ }

  try{
    client.user.setActivity('Made by yo-ooyo', { type: "PLAYING" });
  }catch (e) {
      console.log(String(e.stack).red);
  }
  //Change status each 10 minutes
  setInterval(()=>{
    try{
      client.user.setActivity('Mr Beast', { type: "WATCHING" });
    }catch (e) {
        console.log(String(e.stack).red);
    }
  }, 10*60*1000)
  await mongo().then(mongoose=>{
    try{
      console.log('Connected!')


    }finally{
      mongoose.connection.close()
    }

  })
  mongoCurrency.connect(process.env.MONGOPATH).then(mongoCurrency=>{
    try{console.log('CONNECTED')
  }finally{
    mongoCurrency.disconnect()
  }
  
  })
  client.on('message',async (msg)=>{
    try{
        console.log('reconnecting')
        commandBase.loadPrefixes(client)
    }finally{
      console.log('Connection Closed')
    }

  })
  client.on('guildMemberAdd', async(member)=>{
    const welcomeSchema=require('../../Schemas/welcomeSchema')
    const logSchema=require('../../Schemas/logSchema')
    const countSchema=require('../../Schemas/countSchema')
    const onJoin=async member=>{
      const guild = client.guilds.cache.get(member.guild.id);
      await mongo().then(async mongoose=>{
          try{
            //Look for vc
            let countInfo=await countSchema.findOne({_id:member.guild.id})
            const vc=countInfo.voiceChannelID
            setInterval(function () {
              var memberCount = guild.members.cache.filter(member => !member.user.bot).size;  
              var memberCountChannel = client.channels.get(vc);
              memberCountChannel.setName(`${memberCount} members!`);
           }, 1000);
            //Member log
            let logInfo=await logSchema.findOne({_id:member.guild.id})
            let logChannelID=logInfo.channelID
            const logChannel=member.guild.channels.cache.get(logChannelID)
            let embed=new Discord.MessageEmbed().setTitle('New Member')
            .setDescription(`@${member.user.tag}`)
            logChannel.send(embed)
            //Start the Welcome Message

              let info=await welcomeSchema.findOne({_id:member.guild.id})
              let channelID=info.channelID
              let text=info.text
              const channel=member.guild.channels.cache.get(channelID)
              channel.send(`>>> <@!${member.id}> ${text}`)
              

          }finally{
              mongoose.connection.close()
          }
      })
  }
    await onJoin(member)


  })
}

/** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */
