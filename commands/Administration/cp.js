const mongo=require('../../botconfig/mongo')
const prefixSchema=require('../../Schemas/prefixSchema')
module.exports = {
    name: "cp",
    aliases: ["changeprefix","prefix"],
    description: "changes the prefix",
    category: "Administration",
    memberpermissions:"Administrator",
    cooldown: 60*5,
    usage: "cp <prefix>",
    run:async(client, message, args)=>{
        await mongo().then(async mongoose=>{
             try{
                 let prefix=args[0]
                 await prefixSchema.findOneAndUpdate({
                     _id:message.guild.id
                 }, {
                    _id:message.guild.id,
                    prefix:prefix
                 }, {
                     upsert:true
                 })
                 message.channel.send(`Changed Prefix to ${prefix}`)


             }finally{
                 mongoose.connection.close()
      

             }
        })
        const onMessage= async msg=>{
            let data=cache[guild.id]
            if(!data){
                console.log('FETCHING DATA ')
                await mongo().then(async (mongoose)=>{
                    try{
                        const result= await prefixSchema.findOne({_id:message.guild.id})
                        cache[message.guild.id]=data=[result.prefix]

                    }finally{
                        mongoose.connection.close()

                    }
                })  
            }
        }




    },

};