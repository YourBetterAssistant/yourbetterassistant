'use strict';

import Discord, { Message } from 'discord.js';
function errHandler(e:Error, message?:Message, command?:{name:string}){
    let embed=new Discord.MessageEmbed()
    if(!message)return
    if(!message.guild)return console.log(e)
    embed.addField('Guild:', message.guild.id.toString())
    .addField('GuildName', message.guild.name)
    .addField('Command', command?command.name.toString():'null')
    .addField('Error', `\`${e.stack}\``)
    .setTimestamp(new Date())

    const channel=message.client.channels.cache.get('889101477421912064')
    message.channel.send(`Something happened while running \`${command?command.name.toString():'null'}\`, This has been logged and reported to the developers`)
    return channel.isText()?channel.send({embeds:[embed]
    }):null


}
export default errHandler