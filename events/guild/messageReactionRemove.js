module.exports=async client=>{
  const cache={}
    const rrSchema=require('../../Schemas/rrSchema')
    const mongo=require('../../botconfig/mongo')
    client.on('messageReactionRemove', async(reaction, user) => {
      console.log(`someone reacted`)
      if(reaction.message.channel.type==='DM'??reaction.message.channel.type==='GROUP_DM'??reaction.message.channel.type==='UNKNOWN')return
      if(!cache[reaction.message.guild.id]){
      await mongo().then(async(mongoose)=>{
        try{
          let r=await rrSchema.findOne({_id:reaction.message.guild.id})
          let CH=r.channel
          let R1=r.role1
          let R2=r.role2
          let E1=r.emoji1
          let E2=r.emoji2
          cache[reaction.message.guild.id]={CH, R1, R2, E1, E2}
        }finally{mongoose.connection.close()
        console.log('C closed')}
      })}
      let c=cache[reaction.message.guild.id]
      if(reaction.message.partial) await reaction.message.fetch()
      if(reaction.partial) await reaction.fetch()
      if(user.bot)return
      console.log('NO')
      if(reaction.message.channel.id===c.CH){
        console.log('NO')
          if(reaction.emoji.name===c.E1){
            console.log('Pls')
            let r1=reaction.message.guild.roles.cache.find(r=>r.name===c.R1)
           
            await reaction.message.guild.members.cache.get(user.id).roles.remove(r1)
            await user.send(`The role ${c.R1} has been removed for un-reacting`)
        } else if(reaction.emoji.name===c.E2){
            let r2=reaction.message.guild.roles.cache.find(r=>r.name===c.R2)  
            await reaction.message.guild.members.cache.get(user.id).roles.remove(r2)
            await user.send(`The role ${c.R2} has been removed for un-reacting`)
      }
      }
  });

}