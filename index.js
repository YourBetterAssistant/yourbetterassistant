//Importing all needed Commands
const Discord = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
require('discord-reply')
require('dotenv').config()
const mongoCurrency = require('discord-mongo-currency-fork');
const commandBase=require('./events/guild/message')
const Levels=require('discord-xp')
const mongo=require('./botconfig/mongo')
const mongoose=require('mongoose')
let token=process.env.TOKEN
const colors = require("colors"); //this Package is used, to change the colors of our Console! (optional and doesnt effect performance)
const fs = require("fs"); //this package is for reading files and getting their inputs

//Creating the Discord.js Client for This Bot with some default settings ;) and with partials, so you can fetch OLD messages
const client = new Discord.Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const disbut = require('discord-buttons');
disbut(client);



//Client variables to use everywhere
client.commands = new Discord.Collection(); //an collection (like a digital map(database)) for all your commands
client.aliases = new Discord.Collection(); //an collection for all your command-aliases
client.categories = fs.readdirSync("./commands/"); //categories
client.cooldowns = new Discord.Collection(); //an collection for cooldown commands of each user

//Loading files, with the client variable like Command Handler, Event Handler, ...
["command", "events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
client.on('message', async(message)=>{
  if (!message.guild) return;
  if (message.author.bot) return;
  
  const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
  const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
  if (hasLeveledUp) {
    const user = await Levels.fetch(message.author.id, message.guild.id);
    message.channel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`);
  }
})
//login into the bot
client.login(token);

/** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */
