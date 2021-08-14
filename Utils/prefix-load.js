const mongo=require('../botconfig/mongo')
const commandPrefixSchema=require('../Schemas/prefixSchema')
async function prefixLoad(client, guildPrefixes){
    await mongo().then(async mongoose=>{
      try{
          /**
           * @param client
           * The Client 
           * */
        for(const guild of client.guilds.cache){
          let guildID= guild[1].id
          const result= await commandPrefixSchema.findOne({_id:guildID})
          if (result){
            guildPrefixes[guildID] = result.prefix
        } else {
            guildPrefixes[guildID] = globalPrefix
        }
        }
        console.log(guildPrefixes)
      
      }
      catch(err){
        await mongoose.connection.close()
        console.log(`An error occured \n\n\n\n\n\n\n ${err.stack}`)
        return
      }
      
  
    })}
    
  exports.prefixLoad=prefixLoad
  
  
   