"use strict";
/**
  * @INFO
  * Loading all needed File Information Parameters
*/
const commandPrefixSchema=require('../../Schemas/prefixSchema')
const Levels=require('discord-xp')
const {count}=require('../../Utils/count')
const {level}=require('../../Utils/level')
const {check}=require('../../Utils/checkChatChannel')
const {prefixLoad, newCache}=require('../../Utils/prefix-load')
let process=require('process')
const mongo=require('../../botconfig/mongo')
let countSchema=require('../../Schemas/countSchema')
const config = require("../../botconfig/config.json"); //loading config file with token and prefix, and settings
const {prefix:globalPrefix}=require('../../botconfig/config.json')
const ee = require("../../botconfig/embed.json"); //Loading all embed settings like color footertext and icon ...
const Discord = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
const { escapeRegex} = require("../../handlers/functions"); //Loading all needed functions
const { Mongoose } = require('mongoose');
Levels.setURL(config.mongoPath);
const {duration}=require('../../handlers/functions')
//here the event starts
let prefix
module.exports = async (client, message) => {
  const guildPrefixes={}
  try {
    //if the message is not in a guild (aka in dms), return aka ignore the inputs
    // if the message  author is a bot, return aka ignore the inputs
    setInterval(newCache,  3600000)
    if (message.author.bot) return;
    //if the channel is on partial fetch it
    if (message.channel.partial) await message.channel.fetch();
    //if the message is on partial fetch it
    if (message.partial) await message.fetch();
    //get the current prefix from the botconfig/config.json
    await prefixLoad(client, guildPrefixes, globalPrefix, message)
    await level(message)
    await count(message)
    await check(message)
    prefix=guildPrefixes[message.guild.id] || globalPrefix
    //the prefix can be a Mention of the Bot / The defined Prefix of the Bot
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    //if its not that then return
    if (!prefixRegex.test(message.content)) return;
    //now define the right prefix either ping or not ping
    const [, matchedPrefix] = message.content.match(prefixRegex);
    //create the arguments with sliceing of of the rightprefix length
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    //creating the cmd argument by shifting the args by 1
    const cmd = args.shift().toLowerCase();
    //if no cmd added return error
     if (cmd.length === 0){
       let embed=new Discord.MessageEmbed()
       .setColor(ee.color)
       .setFooter(ee.footertext,ee.footericon)
       .setTitle(`Hugh? I got pinged? Imma give you some help`)
       .setDescription(`To see all Commands type: \`${prefix}help\``)
      if(message.content.startsWith(`<@!${client.user.id}>`))
        return message.channel.send({embeds:[embed]});
       
      return;
      }
    //get the command from the collection
    let command = client.commands.get(cmd);
    //if the command does not exist, try to get it by his alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    //if the command is now valid
    if (command){
        if (!client.cooldowns.has(command.name)) { //if its not in the cooldown, set it too there
            client.cooldowns.set(command.name, new Discord.Collection());
        }
        const now = Date.now(); //get the current time
        const timestamps = client.cooldowns.get(command.name); //get the timestamp of the last used commands
        const cooldownAmount = (command.cooldown || config.defaultCommandCooldown) * 1000; //get the cooldownamount of the command, if there is no cooldown there will be automatically 1 sec cooldown, so you cannot spam it^^
        if (timestamps.has(message.author.id)) { //if the user is on cooldown
          const expirationTime = timestamps.get(message.author.id) + cooldownAmount; //get the amount of time he needs to wait until he can run the cmd again
          if (now < expirationTime) { //if he is still on cooldonw
            const timeLeft = (expirationTime - now); //get the lefttime
            let embed=new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext,ee.footericon)
            .setTitle(`❌ Please wait ${duration(timeLeft)} before reusing the \`${command.name}\` command.`)
            return message.channel.send({embeds:[embed]});
             //send an information message
          }
        }
        timestamps.set(message.author.id, now); //if he is not on cooldown, set it to the cooldown
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); //set a timeout function with the cooldown, so it gets deleted later on again
      try{
        //if Command has specific permission return error
        if(command.memberpermissions && !message.member.permissions.has(command.memberpermissions)) {
          let e=new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle("❌ Error | You are not allowed to run this command!")
          .setDescription('You Do Not Have The Required Perms!')
          return message.channel.send({embeds:[e]
          }).then(msg=>msg.delete({timeout: 10000}).catch(e=>console.log("Couldn't Delete --> Ignore".gray)));
        }
        //if the Bot has not enough permissions return error
        let required_perms = ["ADD_REACTIONS","VIEW_CHANNEL","SEND_MESSAGES",
        "EMBED_LINKS","CONNECT","SPEAK"]
        if(!message.guild.me.permissions.has(required_perms)){
          try{ message.react("❌"); }catch{}
          let embed=new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle("❌ Error | I don't have enough Permissions!")
          .setDescription("Please give me just `ADMINISTRATOR`, because I need it to delete Messages, Create Channel and execute all Admin Commands.\n If you don't want to give me them, then those are the exact Permissions which I need: \n> `" + required_perms.join("`, `") +"`")
          return message.channel.send({embeds:[embed]
          })
        }

        //run the command with the parameters:  client, message, args, user, text, prefix,
        command.run(client, message, args, message.member, args.join(" "), prefix);
      }catch (e) {
        console.log(String(e.stack).red)
        let em=new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle("❌ Something went wrong while, running the: `" + command.name + "` command")
        .setDescription(`\`\`\`${e.message}\`\`\``)
        .addField('Guild:', message.guild.id.toString())
        .addField('GuildName', message.guild.name)
        .setTimestamp(new Date())
        const channel=client.channels.cache.get('889101477421912064')
        message.channel.send(`Something happened while running \`${command.name}\`, This has been logged and reported to the developers`)
        return channel.send({embeds:[em]
        })
      }
    }
    else{ //if the command is not found send an info msg
    let embed=new Discord.MessageEmbed()
    .setColor(ee.wrongcolor)
    .setFooter(ee.footertext, ee.footericon)
    .setTitle(`❌ Unkown command, try: **\`${prefix}help\`**`)
    .setDescription(`To get help on a specific command, type \`${prefix}help [command name]\``)
    return message.channel.send({embeds:[embed]
    }).then(msg=>msg.delete({timeout: 10000}).catch(e=>console.log("Couldn't Delete --> Ignore".gray)));}
    const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
     const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
     if (hasLeveledUp) {
       const user = await Levels.fetch(message.author.id, message.guild.id);
       message.channel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`);}
       process.on('uncaughtException', function (err) {
        console.log('Caught exception: ', err);
      });

  }catch (e){
    const {erroHandler:err}=require('../../handlers/errorHandler')
    err(e, message)

  }
  /**
    * @INFO
    * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template
    * @INFO
    * Work for Milrato Development | https://milrato.eu
    * @INFO
    * Please mention Him / Milrato Development, when using this Code!
    * @INFO
  */

   
}, prefix

