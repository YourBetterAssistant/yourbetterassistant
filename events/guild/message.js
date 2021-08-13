/**
  * @INFO
  * Loading all needed File Information Parameters
*/
const commandPrefixSchema=require('../../Schemas/prefixSchema')
const Levels=require('discord-xp')
let process=require('process')
const mongo=require('../../botconfig/mongo')
const guildPrefixes={}
let countSchema=require('../../Schemas/countSchema')
const config = require("../../botconfig/config.json"); //loading config file with token and prefix, and settings
const {prefix:globalPrefix}=require('../../botconfig/config.json')
const ee = require("../../botconfig/embed.json"); //Loading all embed settings like color footertext and icon ...
const Discord = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
const { escapeRegex} = require("../../handlers/functions"); //Loading all needed functions
const { Mongoose } = require('mongoose');
Levels.setURL(config.mongoPath);
//here the event starts
module.exports = async (client, message) => {
  console.log(guildPrefixes[message.guild.id])
  try {
    //if the message is not in a guild (aka in dms), return aka ignore the inputs
    
    // if the message  author is a bot, return aka ignore the inputs
    if (message.author.bot) return;
    //if the channel is on partial fetch it
    if (message.channel.partial) await message.channel.fetch();
    //if the message is on partial fetch it
    if (message.partial) await message.fetch();
    //get the current prefix from the botconfig/config.json
    let prefix= guildPrefixes[message.guild.id] || globalPrefix
  
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
            const timeLeft = (expirationTime - now) / 1000; //get the lefttime
            let embed=new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext,ee.footericon)
            .setTitle(`❌ Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
            return message.channel.send({embeds:[embed]});
             //send an information message
          }
        }
        timestamps.set(message.author.id, now); //if he is not on cooldown, set it to the cooldown
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); //set a timeout function with the cooldown, so it gets deleted later on again
      try{
        //if Command has specific permission return error
        if(command.memberpermissions && !message.member.permissions.has(command.memberpermissions)) {
          return message.channel.send({embeds:new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle("❌ Error | You are not allowed to run this command!")
            .setDescription('You Do Not Have The Required Perms!')
          }).then(msg=>msg.delete({timeout: 5000}).catch(e=>console.log("Couldn't Delete --> Ignore".gray)));
        }
        //if the Bot has not enough permissions return error
        let required_perms = ["ADD_REACTIONS","VIEW_CHANNEL","SEND_MESSAGES",
        "EMBED_LINKS","CONNECT","SPEAK"]
        if(!message.guild.me.permissions.has(required_perms)){
          try{ message.react("❌"); }catch{}
          return message.channel.send({embeds:new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle("❌ Error | I don't have enough Permissions!")
            .setDescription("Please give me just `ADMINISTRATOR`, because I need it to delete Messages, Create Channel and execute all Admin Commands.\n If you don't want to give me them, then those are the exact Permissions which I need: \n> `" + required_perms.join("`, `") +"`")
          })
        }

        //run the command with the parameters:  client, message, args, user, text, prefix,
        command.run(client, message, args, message.member, args.join(" "), prefix);
      }catch (e) {
        console.log(String(e.stack).red)
        return message.channel.send({embeds:new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle("❌ Something went wrong while, running the: `" + command.name + "` command")
          .setDescription(`\`\`\`${e.message}\`\`\``)
        }).then(msg=>msg.delete({timeout: 5000}).catch(e=>console.log("Couldn't Delete --> Ignore".gray)));
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
    let countInfo=await countSchema.findOne({_id:message.guild.id})
    if(countInfo){
      const vc=countInfo.voiceChannelID
      setInterval(function () {
        var memberCount = message.guild.members.cache.filter(m => !m.user.bot).size;  
        var memberCountChannel =  message.guild.channels.cache.get(vc);
        if(!memberCountChannel)return
        memberCountChannel.setName(`${memberCount} members!`);
     }, 1000);}
     if (!message.guild) return;
     if (message.author.bot) return;
     
     
      /*setTimeout(function () {
        console.log('This will still run.');
      }, 500);*/
      
      // Intentionally cause an exception, but don't catch it.

  }catch (e){
    let embed=new Discord.MessageEmbed()
    .setColor("RED")
    .setTitle(`❌ ERROR | An error occurred`)
    .setDescription(`\`\`\`${e.stack}\`\`\``)
    return message.channel.send({embeds:[embed]
    
    });
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

   
}
module.exports.loadPrefixes=async(client)=>{
  await mongo().then(async mongoose=>{
    try{
      for(const guild of client.guilds.cache){
        let guildID= guild[1].id
        const result= await commandPrefixSchema.findOne({_id:guildID})
        if (result){
          guildPrefixes[guildID] = result.prefix
      } else {
          guildPrefixes[guildID] = globalPrefix
      }
      }
      console.log(guildPrefixes)
    
    }
    catch(err){
      await mongoose.connection.close()
      console.log(`An error occured`)
      return
    }
    

  })
  

}

 