'use strict';

const { MessageEmbed } = require("discord.js");
const ee = require("../../botconfig/embed.json");
module.exports = {
    name: "say",
    category: "Fun",
    cooldown: 2,
    usage: "say <TEXT>",
    description: "Resends your Text",
    run: async (client, message, args, user, text, prefix) => {
      if(message.mentions.members)return message.channel.send('I am not allowed to Mention Users with this command')
    try{
      if(!args[0])
        return message.channel.send({embeds:new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | You didn't provided a Text`)
            .setDescription(`Usage: \`${prefix}${this.usage}\``)
        });

      message.channel.send(text);
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send({embeds:new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        });
    }
  }
}

/** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */
