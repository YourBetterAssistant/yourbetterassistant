"use strict";
import Levels from "discord-xp";
import count from "../../Utils/count";
import level from "../../Utils/level";
import check from "../../Utils/checkChatChannel";
import Logger from "../../lib/logger";
import Trainer from "../../lib/trainer";
import { prefixLoad, clearCache as newCache } from "../../Utils/prefix-load";
let process = require("process");
import config from "../../botconfig/config.json"; //loading config file with token and prefix, and settings
import { prefix as globalPrefix } from "../../botconfig/config.json";
import ee from "../../botconfig/embed.json"; //Loading all embed settings like color footertext and icon ...
import Discord, { Client, Message, TextChannel } from "discord.js"; //this is the official discord.js wrapper for the Discord Api, which we use!
import funcs from "../../handlers/functions"; //Loading all needed functions
Levels.setURL(config.mongoPath);
import unknownCommand from "../../Schemas/unknownCommand";
import {
  checkAutoMod,
  forceNewCache as forceAutoCacheMod,
} from "../../Utils/checkAutoMod";
import autoMod from "../../Constructors/autoModUser";
import levellingEnabled from "../../Schemas/levellingEnabled";
//here the event starts
let prefix;
const logger = new Logger("Events - MessageCreate");
module.exports = async (client: Client, message: Message) => {
  const automod = new autoMod(message);
  const guildPrefixes: { [key: string]: string } = {};
  try {
    //if the message is not in a guild (aka in dms), return aka ignore the inputs
    // if the message  author is a bot, return aka ignore the inputs
    setInterval(newCache, 3600000);
    setInterval(forceAutoCacheMod, 3600000);
    if (message.author.bot) return;
    //if the channel is on partial fetch it
    if (message.channel.partial) await message.channel.fetch();
    //if the message is on partial fetch it
    if (message.partial) await message.fetch();
    //get the current prefix from the botconfig/config.json
    if (!message.guild) {
      const embed = new Discord.MessageEmbed()
        .setTitle("Support DM")
        .setDescription(message.content)
        .setFooter(`Asked By ${message.author.username}`)
        .setColor("RED");
      const owner = await client.users.fetch("827388013062389761");
      owner.send(message.content + "\nAsked by " + message.author.tag);
      const channel = (await client.channels.fetch(
        "879949650415722556"
      )) as TextChannel;
      channel?.send({ embeds: [embed] });
      return message.channel.send(
        "My DMS are for support messages only, the message sent will be forwarded to the owner and to our support server for an answer please join our server at https://discord.gg/h2YfQbKFTR"
      );
    }
    Trainer(message.content);
    await prefixLoad(client, guildPrefixes, globalPrefix);
    await count(message);
    await check(message);
    await checkAutoMod(message).then(async (found) => {
      if (found?.strictmode === "true") {
        await automod.checkProfanity();
        await automod.allCaps();
      } else if (found?.strictmode === "false") {
        await automod.allCaps();
      }
    });
    if (
      message.content.toLowerCase() === "ded chat" ||
      message.content.toLowerCase() === "dead chat"
    )
      return message.channel.send(
        "Good Eye Why Not Try To Start A Conversation?"
      );
    const levelTrue = await levellingEnabled.findOne({
      guildID: message.guild.id,
    });
    if (levelTrue) {
      await level(message);
      const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
      const hasLeveledUp = await Levels.appendXp(
        message.author.id,
        message.guild.id,
        randomAmountOfXp
      );
      if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(
          `${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`
        );
      }
    }
    prefix = guildPrefixes[message.guild.id] || globalPrefix; //comment ||guildPrefixes[message.guild.id] to be able to only use b!
    client.prefix = guildPrefixes || globalPrefix;
    //the prefix can be a Mention of the Bot / The defined Prefix of the Bot
    const prefixRegex = new RegExp(
      `^(<@!?${client.user?.id}>|${funcs.escapeRegex(prefix)})\\s*`
    );
    //if its not that then return
    if (!prefixRegex.test(message.content)) return;
    //now define the right prefix either ping or not ping
    const [_null, matchedPrefix] = message.content.match(
      prefixRegex
    ) as RegExpMatchArray;
    //create the arguments with sliceing of of the rightprefix length
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    //creating the cmd argument by shifting the args by 1
    const cmd = args.shift()?.toLowerCase();
    //if no cmd added return error
    if (cmd?.length! === 0) {
      let embed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`Hugh? I got pinged? Imma give you some help`)
        .setDescription(
          `To see all Commands type: \`${client.prefix[message.guild.id]}help\``
        );
      if (message.content.startsWith(`<@!${client.user?.id}>`))
        return message.channel.send({ embeds: [embed] });

      return;
    }
    //get the command from the collection
    let command = client.commands.get(cmd);
    //if the command does not exist, try to get it by his alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    //if the command is now valid
    if (command) {
      if (!client.cooldowns.has(command.name)) {
        //if its not in the cooldown, set it too there
        client.cooldowns.set(command.name, new Discord.Collection());
      }
      const now = Date.now(); //get the current time
      const timestamps = client.cooldowns.get(command.name); //get the timestamp of the last used commands
      const cooldownAmount = (command.cooldown || 2) * 1000; //get the cooldownamount of the command, if there is no cooldown there will be automatically 1 sec cooldown, so you cannot spam it^^
      if (timestamps.has(message.author.id)) {
        //if the user is on cooldown
        const expirationTime =
          timestamps.get(message.author.id) + cooldownAmount; //get the amount of time he needs to wait until he can run the cmd again
        if (now < expirationTime) {
          //if he is still on cooldonw
          const timeLeft = expirationTime - now; //get the lefttime
          let embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(
              `❌ Please wait ${funcs.duration(
                timeLeft
              )} before reusing the \`${command.name}\` command.`
            );
          return message.channel.send({ embeds: [embed] });
          //send an information message
        }
      }
      timestamps.set(message.author.id, now); //if he is not on cooldown, set it to the cooldown
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); //set a timeout function with the cooldown, so it gets deleted later on again
      try {
        //if Command has specific permission return error
        if (
          command.memberpermissions &&
          !message.member?.permissions.has(command.memberpermissions)
        ) {
          let e = new Discord.MessageEmbed()
            .setColor("RED")
            .setFooter(ee.footertext, ee.footericon)
            .setTitle("❌ Error | You are not allowed to run this command!")
            .setDescription("You Do Not Have The Required Perms!");
          return message.channel.send({ embeds: [e] }).then((msg) =>
            setTimeout(() => {
              msg
                .delete()
                .catch(() => logger.error("Couldn't Delete --> Ignore"));
            }, 1000)
          );
        }
        //if the Bot has not enough permissions return error
        // let required_perms = ["ADD_REACTIONS","VIEW_CHANNEL","SEND_MESSAGES",
        // "EMBED_LINKS", "CONNECT", "SPEAK"]
        // if(!message.guild.me.permissions.has(required_perms)){
        //   try{ message.react("❌"); }catch{}
        //   let embed=new Discord.MessageEmbed()
        //   .setColor(ee.wrongcolor)
        //   .setFooter(ee.footertext, ee.footericon)
        //   .setTitle("❌ Error | I don't have enough Permissions!")
        //   .setDescription("Please give me just `ADMINISTRATOR`, because I need it to delete Messages, Create Channel and execute all Admin Commands.\n If you don't want to give me them, then those are the exact Permissions which I need: \n> `" + required_perms.join("`, `") +"`")
        //   message.channel.send({embeds:[embed]
        //   })
        // }

        //run the command with the parameters:  client, message, args, user, text, prefix,
        command.run(client, message, args);
      } catch (e: any) {
        logger.error(e.stack);
        let em = new Discord.MessageEmbed()
          .setColor("RED")
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(
            "❌ Something went wrong while, running the: `" +
              command.name +
              "` command"
          )
          .setDescription(`\`\`\`${e.message}\`\`\``)
          .addField("Guild:", message.guild.id.toString())
          .addField("GuildName", message.guild.name)
          .setTimestamp(new Date());
        const channel = client.channels.cache.get(
          "889101477421912064"
        ) as TextChannel;
        message.channel.send(
          `Something happened while running \`${command.name}\`, This has been logged and reported to the developers`
        );
        return channel?.send({ embeds: [em] });
      }
    } else {
      //if the command is not found send an info msg
      const d = await unknownCommand.findOne({ guildId: message.guild.id });
      if (d) {
        let embed = new Discord.MessageEmbed()
          .setColor("RED")
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ Unkown command, try: **\`${prefix}help\`**`)
          .setDescription(
            `To get help on a specific command, type \`${prefix}help [command name]\``
          );
        const m = await message.channel.send({ embeds: [embed] });
        setTimeout(function () {
          m.delete();
        }, 2000);
      }
    }
  } catch (e) {
    const { erroHandler: err } = require("../../handlers/errorHandler");
    err(e, message);
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
};
