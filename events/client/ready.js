//here the event starts
const config = require("../../botconfig/config.json")
const loadPrefix=require('../../Utils/prefix-load')
const {lavacordManager}=require('../../index')
const Discord=require('discord.js')
require('dotenv').config()
const mongoCurrency = require('discord-mongo-currency-fork');
const mongoose=require('mongoose')
const welcomeSchema=require('../../Schemas/welcomeSchema')
const Levels = require("discord-xp");

const mongo=require('../../botconfig/mongo');
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
    client.user.setActivity(`${client.guilds.cache.size} servers`, { type: "WATCHING" });
  }catch (e) {
      return console.log(String(e.stack).red);
  }
  //Change status each 10 minutes
  setInterval(()=>{
    try{
      client.user.setActivity('Ping me for help!', { type: "PLAYING" });
      
    }catch (e) {
        return console.log(String(e.stack).red);
    }
  }, 10*60*1000)
  await mongo().then(mongoose=>{
    try{
      console.log('Connected!')


    }catch(err){
      console.log(`Breh error \n\n ${err.stack}`)
    }

  })
  mongoCurrency.connect(process.env.MONGOPATH).then(mongoCurrency=>{
    try{console.log('CONNECTED')
  }catch(err){
    console.log(`Breh error\n\n${err.stack}`)
  }
  
  })
  client.guilds.cache.forEach(guild=>{
    console.log(guild.name)
  })



}

/** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */
