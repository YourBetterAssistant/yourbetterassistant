'use strict';

module.exports=async (client, member)=>{
        const welcomeSchema=require('../../Schemas/welcomeSchema')
        const logSchema=require('../../Schemas/logSchema')
        const countSchema=require('../../Schemas/countSchema')
        const mongo=require('../../botconfig/mongo')
        const Discord=require('discord.js')
        const onJoin=async member=>{
          console.log('Join')
          const guild = client.guilds.cache.get(member.guild.id);
          await mongo().then(async mongoose=>{
              try{
                //Look for vc
                await guild.members.fetch({force:true})
                let countInfo=await countSchema.findOne({_id:member.guild.id})
                const vc=countInfo.voiceChannelID
                setInterval(function () {
                  var memberCount = guild.members.cache.filter(member => !member.user.bot).size;  
                  var memberCountChannel = guild.channels.cache.get(vc);
                  memberCountChannel.setName(`${memberCount} members!`);
               }, 1000);
                //Member log
                console.log('pls')
                let logInfo=await logSchema.findOne({_id:member.guild.id})
                let logChannelID=logInfo.channelID
                const logChannel=member.guild.channels.cache.get(logChannelID)
                let embed=new Discord.MessageEmbed().setTitle('New Member')
                .setDescription(`Our Newest Member!`)
                .addField('Member', `${member}`)
                .setColor('RANDOM')
                logChannel.send({embeds:[embed]})
                //Start the Welcome Message
    
                  let info=await welcomeSchema.findOne({_id:member.guild.id})
                  let channelID=info.channelID
                  let text=info.text
                  let option=info.DM
                  const channel=member.guild.channels.cache.get(channelID)
                  if(option==='true'){
                    member.send(`>>> <@!${member.id}> ${text}`)
                  }else{
                  channel.send(`>>> <@!${member.id}> ${text}`)}
                  
    
              }catch(err){console.log(`Error \n\n\n\n\n ${err.stack}`)}
          })
      }
        await onJoin(member)
    
    
      }