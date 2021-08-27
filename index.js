//Importing all needed Commands
const Discord = require("discord.js");//this is the official discord.js wrapper for the Discord Api, which we use!
require('dotenv').config()
require('@weky/inlinereply')
const commandBase=require('./events/guild/messageCreate')
const { AutoPoster } = require('topgg-autoposter')
const Levels=require('discord-xp')
const mongo=require('./botconfig/mongo')
const mongoose=require('mongoose')
let token=process.env.TOKEN
const config=require('./botconfig/config.json')
const colors = require("colors"); //this Package is used, to change the colors of our Console! (optional and doesnt effect performance)
const fs = require("fs"); //this package is for reading files and getting their inputs

//Creating the Discord.js Client for This Bot with some default settings ;) and with partials, so you can fetch OLD messages
const client=new Discord.Client({fetchAllMembers: true, messageCacheMaxSize: 10, disableEveryone: false,partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],intents:["GUILDS", "GUILD_MESSAGES",'GUILD_MESSAGE_REACTIONS', 'GUILD_VOICE_STATES', 'GUILD_PRESENCES', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_INVITES']})
const ap = AutoPoster(process.env.TOPGGTOKEN, client)
const clientId = '862143828920369172'


//Client variables to use everywhere
client.commands = new Discord.Collection(); //an collection (like a digital map(database)) for all your commands
client.aliases = new Discord.Collection(); //an collection for all your command-aliases
client.categories = fs.readdirSync("./commands/"); //categories
client.cooldowns = new Discord.Collection(); //an collection for cooldown commands of each user

//Loading files, with the client variable like Command Handler, Event Handler, ...
["command", "events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
ap.on('posted', () => {
  console.log('Posted stats to Top.gg!')
})
//slash
client.api.applications(clientId).commands.post({data: {
  name: 'ping',
  description: 'ping pong!'
}})




//login into the bot
client.login(token);
/** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */
