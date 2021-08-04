module.exports=async (client)=>{
    client.on('guildMemberAdd', async(member)=>{
        const welcomeSchema=require('../../Schemas/welcomeSchema')
        const logSchema=require('../../Schemas/logSchema')
        const countSchema=require('../../Schemas/countSchema')
        const mongo=require('../../botconfig/mongo')
        const onJoin=async member=>{
          const guild = client.guilds.cache.get(member.guild.id);
          await mongo().then(async mongoose=>{
              try{
                //Look for vc
                let countInfo=await countSchema.findOne({_id:member.guild.id})
                const vc=countInfo.voiceChannelID
                setInterval(function () {
                  var memberCount = guild.members.cache.filter(member => !member.user.bot).size;  
                  var memberCountChannel = guild.channels.cache.get(vc);
                  memberCountChannel.setName(`${memberCount} members!`);
               }, 1000);
                //Member log
                let logInfo=await logSchema.findOne({_id:member.guild.id})
                let logChannelID=logInfo.channelID
                const logChannel=member.guild.channels.cache.get(logChannelID)
                let embed=new Discord.MessageEmbed().setTitle('New Member')
                .setDescription(`@${member.user.tag}`)
                logChannel.send(embed)
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
                  
    
              }finally{
                  mongoose.connection.close()
              }
          })
      }
        await onJoin(member)
    
    
      })
}