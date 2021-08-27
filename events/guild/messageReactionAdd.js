module.exports=async client=>{
  const cache={}
    const rrSchema=require('../../Schemas/rrSchema')
    const mongo=require('../../botconfig/mongo')
    client.on('messageReactionAdd', async(reaction, user) => {
      console.log(`someone reacted`)
      if(!cache[reaction.message.guild.id]){
      await mongo().then(async(mongoose)=>{
        try{
          if(message.channel.type==='DM'??message.channel.type==='GROUP_DM'??message.channel.type==='UNKNOWN')return
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
      console.log('Yes')
      if(reaction.message.channel.id===c.CH){
        console.log('YES')
          if(reaction.emoji.name===c.E1){
            console.log('Pls')
            let r1=reaction.message.guild.roles.cache.find(r=>r.name===c.R1)
            await reaction.message.guild.members.cache.get(user.id).roles.add(r1)
            await user.send(`You have been given the role ${c.R1} for reacting`)
      }else if(reaction.emoji.name===c.E2){
          let r2=reaction.message.guild.roles.cache.find(r=>r.name===c.R2)
          await reaction.message.guild.members.cache.get(user.id).roles.add(r2)
          await user.send(`You have been given the role ${c.R2} for reacting`)
      }
      }
  });

}