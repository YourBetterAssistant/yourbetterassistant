'use strict';

const fs=require('fs')
const Discord=require('discord.js')
function errorHandler(e, message, command){
    if(!message)return
    let embed=new Discord.MessageEmbed()
    .addField('Guild:', message.guild.id.toString())
    .addField('GuildName', message.guild.name)
    .addField('Command', command.name.toString)
    .addField('Error', `\`${e.stack}\``)
    .setTimestamp(new Date())
    const channel=client.channels.cache.get('889101477421912064')
    message.channel.send(`Something happened while running \`${command.name}\`, This has been logged and reported to the developers`)
    return channel.send({embeds:[em]
    })


}
exports.erroHandler=errorHandler