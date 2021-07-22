//here the event starts
const config = require("../../botconfig/config.json")
const commandBase=require('../guild/message')
require('dotenv').config()
const mongoCurrency = require('discord-mongo-currency');
const mongoose=require('mongoose')
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
  client.on('guildMemberRemove', (member, guild) => {
    mongoCurrency.deleteUser(member.id, guild.id)
  });
}

/** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */
