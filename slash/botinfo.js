'use strict';

const { duration, delay } = require("../handlers/functions")
const osInfo = require("@felipebutcher/node-os-info");
const {SlashCommandBuilder}=require('@discordjs/builders')
const data=new SlashCommandBuilder()
data.setName('botinfo').setDescription('Shows Bot Info')
module.exports={
    name:'botinfo',
    description:'Shows Bot Info',
    run:async(client, interaction, Discord)=>{
        let embed=new Discord.MessageEmbed()
        .setTitle('Bot-Info')
        .addField(name='Users', value=`**${client.users.cache.size}** users being watched`, inline=true)
        .addField(name='Servers', value=`${client.guilds.cache.size} servers being watched`, inline=true)
        .addField(name='Gateway', value=`${client.ws.gateway}`, inline=true)
        .addField(name='Ping', value=`${client.ws.ping}ms`, inline=true)
        .addField(name='Shards', value=`${client.ws.shards.size} shards being used`, inline=true)
        .addField(name='Websocket Status', value=`${client.ws.status}`, inline=true)
        .addField(name='Uptime', value=`${duration(client.uptime)}`, inline=true)
        .addField(name='Command Size', value=client.commands.size.toString(), inline=true)
        .addField('Slash Commands Size', client.interactions.size.toString())
        .addField(name='** **', value='** **')
        .setColor('BLUE')
        .setAuthor(`Requested By ${interaction.member.user.username}`);
        osInfo.cpu(cpu => {
            embed.addField(name='CPU-Load', value=`${Math.round(cpu * 100)}%`, inline=true)
        });
        osInfo.mem(memory => {
            embed.addField(name='Memory Used', value=`${Math.round(memory * 100)}%`, inline=true)
        });
        await interaction.deferReply()
        delay(2000)
        await interaction.editReply({embeds:[embed]})

    }
}
