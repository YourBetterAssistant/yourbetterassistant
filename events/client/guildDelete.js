const chatbot = require("../../Schemas/chatbot")
const countSchema = require("../../Schemas/countSchema")
const logSchema = require("../../Schemas/logSchema")
const prefix=require('../../Schemas/prefixSchema')
const rr=require('../../Schemas/rrSchema')
const conf=require('../../Schemas/serverConfSchema')
const welcome=require('../../Schemas/welcomeSchema')
const mongo=require('../../botconfig/mongo')
module.exports=async(client, guild)=>{
    console.log(guild.id)
    await mongo().then(async ()=>{
        try{    
            await chatbot.findOneAndRemove({guildID:guild.id})
            await countSchema.findOneAndRemove({_id:guild.id})
            await logSchema.findOneAndRemove({_id:guild.id})
            await prefix.findOneAndRemove({_id:guild.id})
            await conf.findOneAndRemove({_id:guild.id})
            await welcome.findOneAndRemove({_id:guild.id})
        }catch(err){}
    }
    )


    
    

}