'use strict';

module.exports=async (client, member)=>{

        const countSchema=require('../../Schemas/countSchema')
        const guild = client.guilds.cache.get(member.guild.id);
        const logSchema=require('../../Schemas/logSchema')
        const mongo=require('../../botconfig/mongo')
        const Discord=require('discord.js')
        await mongo().then(async mongoose=>{
          try{
            let countInfo=await countSchema.findOne({_id:member.guild.id})
            const vc=countInfo.voiceChannelID
            let logInfo=await logSchema.findOne({_id:member.guild.id})
            let logChannelID=logInfo.channelID
            const logChannel=member.guild.channels.cache.get(logChannelID)
            let embed=new Discord.MessageEmbed().setTitle('Member Left')
                .setDescription('Goodbye person hope we see you again')
                .addField('Member', `${member}`)
                .setColor('RANDOM')
                logChannel.send({embeds:[embed]})
            setInterval(function () {
              try{
                var memberCount = guild.members.cache.filter(member => !member.user.bot).size;  
                var memberCountChannel = guild.channels.cache.get(vc);
                memberCountChannel.setName(`${memberCount} members!`);
              }catch(err){return }
            }, 1000)

          }catch(err){console.log(err.stack)}
        })
}