const { MessageEmbed } = require("discord.js");
const { duration } = require("../../handlers/functions")
const osInfo = require("@felipebutcher/node-os-info");
module.exports = {
    name: "botinfo",
    description: "Shows stats of bot",
    category: "Information",
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 5,
    usage: "botinfo",
    run:async(client, message, args)=>{
        let embed=new MessageEmbed()
        .setTitle('Bot-Info')
        .addField(name='Users', value=`**${client.users.cache.size}** users being watched`, inline=true)
        .addField(name='Servers', value=`${client.guilds.cache.size} servers being watched`, inline=true)
        .addField(name='Gateway', value=`${client.ws.gateway}`, inline=true)
        .addField(name='Ping', value=`${client.ws.ping}ms`, inline=true)
        .addField(name='Shards', value=`${client.ws.shards.size} shards being used`, inline=true)
        .addField(name='Websocket Status', value=`${client.ws.status}`, inline=true)
        .addField(name='Uptime', value=`${duration(client.uptime)}`, inline=true)
        .addField(name='Command Size', value=client.commands.size.toString(), inline=true)
        .addField(name='** **', value='** **')
        .setColor('BLUE');
        osInfo.cpu(cpu => {
            embed.addField(name='CPU-Load', value=`${Math.round(cpu * 100)}%`, inline=true)
        });
        osInfo.mem(memory => {
            embed.addField(name='Memory Used', value=`${Math.round(memory * 100)}%`, inline=true)
        });
        setTimeout(function(){message.channel.send({embeds:[embed]})},2000)
        
    },
};