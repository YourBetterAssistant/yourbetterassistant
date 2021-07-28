const Discord=require('discord.js');
const mongo = require('../../botconfig/mongo');
const welcomeSchema=require('../../Schemas/welcomeSchema')
module.exports = {
    name: "welcome",
    description: "Sends the welcome message to a new message NOTE:DO THIS COMMAND IN THE CHANNEL YOU WISH FOR THE MESSAGE TO BE SENT",
    category: "Administration",
    guildOnly: true,
    memberpermissions:"Administrator",
    cooldown: 5,
    usage: "welcome <message>",
    run:async(client, message, args)=>{
        const cache={}
        const msg = args.slice(0).join(" ")
        if (!args[0])return message.lineReply('I need a message or else you are doing no good')
        await mongo().then(async (mongoose)=>{
            try{
                await welcomeSchema.findOneAndUpdate({
                    _id:message.guild.id

                },
                {
                _id:message.guild.id,
                text:msg,
                channelID:message.channel.id},
                {
                    upsert:true
                }
                )
 
                //message confirmation
                message.channel.send(`SUCESS!The new welcome message is now ${msg} Type simjoin to simulate a new member join!`)
   

            }finally{
                mongoose.connection.close()
            }
            const onJoin=async member=>{
                await mongo().then(async mongoose=>{
                    try{
                        let info=await welcomeSchema.findOne({_id:message.guild.id})
                        let channelID=info.channelID
                        let text=info.text
                        const channel=member.guild.channels.cache.get(channelID)
                        channel.send(text)
                        

                    }finally{
                        mongoose.connection.close()
                    }
                })
            }
            client.on('message', async message=>{
                if(message.content.startsWith('simjoin')){
                    await onJoin(message.member)
                    return
                }
            })

        

        })
    },
};