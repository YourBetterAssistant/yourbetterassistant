'use strict';

const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "ping",
    category: "Information",
    aliases: ["latency"],
    cooldown: 2,
    usage: "ping",
    description: "Gives you information on how fast the Bot can respond to you",
    run: async (client, message, args, user, text, prefix) => {
    try{
      let e=new MessageEmbed()
      .setColor(ee.color)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(`🏓 Pinging....`)
      message.channel.send({embeds:[e]
      }).then(msg=>{
        let em=new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle('Pong!')
        .addField('Command Latency', `🏓 Command Latency is \`${Date.now()-message.createdTimestamp}ms\``)
        .addField('API Latency', `🏓 API Latency is \`${Math.round(client.ws.ping)}ms\``)
        msg.edit({embeds:[em]
        });
      })
    } catch (e) {
        console.log(String(e.stack).bgRed)
        let embed=new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`❌ ERROR | An error occurred`)
        .setDescription(`\`\`\`${e.stack}\`\`\``)
        return message.channel.send({embeds:[embed]
        });
    }
  }
}

/** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */
