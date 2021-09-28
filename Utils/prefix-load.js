const mongo=require('../botconfig/mongo')
const commandPrefixSchema=require('../Schemas/prefixSchema')
const cache=[]
async function prefixLoad(client, guildPrefixes, globalPrefix, message){
  client.cache=cache
      try{
          /**
           * @param client
           * The Client 
           * */

        for(const guild of client.guilds.cache){
          let guildID= guild[1].id
          if(cache.length > 0){
            console.log('cache')
            let c=cache.find(c=>c.id==guildID)
            guildPrefixes[guildID]=c.prefix
          }else{
            console.log('new info')
            const result= await commandPrefixSchema.findOne({_id:guildID})
            if (result){
              guildPrefixes[guildID] = result.prefix
              cache.push({id:guildID, prefix:result.prefix})
          } else {
              guildPrefixes[guildID] = globalPrefix
              cache.push({id:guildID, prefix:globalPrefix})
          }
          }
        console.log(guildPrefixes)
        }
        
      
      }
      catch(err){
        console.log(`An error occured \n\n\n\n\n\n\n ${err.stack}`)
        return
      }
      
  
    }
  async function clearCache(){
    cache.length=0
  }
    
  exports.prefixLoad=prefixLoad
  exports.newCache=clearCache
  
  
   