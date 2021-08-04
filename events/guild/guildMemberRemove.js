module.exports=async client=>{
    client.on('guildMemberRemove', async(member) => {
        const countSchema=require('../../Schemas/countSchema')
        const guild = client.guilds.cache.get(member.guild.id);
        const mongo=require('../../botconfig/mongo')
        await mongo().then(async mongoose=>{
          try{
            let countInfo=await countSchema.findOne({_id:member.guild.id})
                const vc=countInfo.voiceChannelID
                setInterval(function () {
                  var memberCount = guild.members.cache.filter(member => !member.user.bot).size;  
                  var memberCountChannel = guild.channels.cache.get(vc);
                  memberCountChannel.setName(`${memberCount} members!`);
                }, 1000)
          }finally{
            mongoose.connection.close()
          }
        })
    });
}