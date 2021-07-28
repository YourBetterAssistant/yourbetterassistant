const mongo=require('../../botconfig/mongo')
const logSchema=require('../../Schemas/logSchema')
module.exports = {
    name: "memberlog",
    description: "Sets up where the memebr log channel should be NOTE:NOT TYPING THE CHANNEL ID WILL MAKE THE MESSAGE SENT TO THE CHANNEL WHICH YOU SET THIS COMMAND UP!",
    category: "Administration",
    guildOnly: true,
    memberpermissions:"Administrator",
    cooldown: 5,
    usage: "memberlog [channelID]",
    run:async(client, message, args)=>{
       let channelID=args[0]
       if(!channelID){
           let channelID=message.channel.id
           await mongo().then(async(mongoose)=>{
               try{
                   await logSchema.findOneAndUpdate({
                       _id:message.guild.id
                   },
                   {
                       _id:message.guild.id,
                       channelID:channelID

                   },
                   {
                       upsert:true
                   })
                   message.channel.send(`<#${channelID}> is now the member-log channel`)


               }finally{
                   mongoose.connection.close()
               }
           })
           
       }else{
           let channelID=args[0]
           await mongo().then(async(mongoose)=>{
            try{
                await logSchema.findByIdAndUpdate({
                    _id:message.guild.id
                },
                {
                    _id:message.guild.id,
                    channelID:channelID

                },
                {
                    upsert:true
                })
                message.channel.send(`<#${channelID}> is now the member-log channel`)


            }finally{
                mongoose.connection.close()
            }
        })
       }
    },
};