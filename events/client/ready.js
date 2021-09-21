//here the event starts
const config = require("../../botconfig/config.json")
const loadPrefix=require('../../Utils/prefix-load')
const {lavacordManager}=require('../../index')
const Discord=require('discord.js')
require('dotenv').config()
const fs=require('fs')
const mongoose=require('mongoose')
const welcomeSchema=require('../../Schemas/welcomeSchema')
const Levels = require("discord-xp");

const mongo=require('../../botconfig/mongo');
const { default: axios } = require("axios")
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

  client.guilds.cache.forEach(guild=>{
    console.log(guild.name)
  })
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
  }
  fs.writeFile('./key.txt',`${makeid(20)}`, (err)=>{if(err)return})
  async function upload(){
    await axios.post("https://discordbotlist.com/api/v1/bots/862143828920369172/stats",{
      guilds:client.guilds.cache.size,
      users:client.users.cache.size
    }, {
      Headers:{Authorization:process.env.DISCORDBOT}
    }).then(()=>console.log('Posted Stats to discordbotlist')).catch(err=>{throw err})
  }
  /*client.interactions.forEach(async(inter)=>{
    if(!inter.guild){
      await client.api.applications(client.user.id).commands.post({data: {
        name: inter.name,
        description: inter.description||'undefined',
      }})
    }else if(inter.guild){
      await client.api.applications(client.user.id).guilds(inter.guild).commands.post({data: {
        name: inter.name,
        description: inter.description||'undefined',
      }})
    }else if(inter.options&&!inter.guild){
      await client.api.applications(client.user.id).commands.post({data: {
        name: inter.name,
        description: inter.description||'undefined',
        options:inter.options
      }})
    }else if(inter.options&&inter.guild){
      await client.api.applications(client.user.id).guilds(inter.guild).commands.post({data: {
        name: inter.name,
        description: inter.description||'undefined',
        options:inter.options
      }})
    }

  })*/
  const commands=[]
  let i=1
  client.interactions.forEach(async(inter)=>{
    if(inter.guild &&!inter.options){
      client.api.applications(client.user.id).guilds(inter.guild).commands.post({data:{name:inter.name, description:inter.description}})
    
    }else if(inter.guild&& inter.options){
      client.api.applications(client.user.id).guilds(inter.guild).commands.post({data:{name:inter.name, description:inter.description, options:inter.options}})
    }else if(!inter.guild&& inter.options){
      client.api.applications(client.user.id).commands.post({data:{name:inter.name, description:inter.description, options:inter.options}})
    }
    else{
      await client.api.applications(client.user.id).commands.post({data:{name:inter.name, description:inter.description}})
    }


})
client.api.application.commands.forEach(item=>console.log(item.name))

}

/** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */
/**/
