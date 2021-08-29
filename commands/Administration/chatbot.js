const mongo = require('../../botconfig/mongo');
const {reply}=require('../../exports')
const chatbot=require('../../Schemas/chatbot')
module.exports = {
    name: "chatbot",
    description: "Choose to enable or diable chatbot and which channel",
    category: "Administration",
    memberpermissions:"ADMINISTRATOR",
    cooldown: 5,
    usage: "chatbot [channelID]",
    run:async(client, message, args)=>{
        if(!args[0]){
            message.channel.send('Tell me the channel name of the channel where the chatbot will stay (case sensitive)')
            let filter=m=>m.author.id===message.author.id
            await message.channel.awaitMessages({
                filter, 
                max:1,
                time:100000,
                errors:['time']
            }).then(async (msg)=>{
                msg=msg.first()
                if(msg){
                let c=message.guild.channels.cache.find(c=>c.name===msg.content)
                if(!c)return msg.channel.send('The channel name provided is invalid try again later')
                await mongo().then(async ()=>{
                    await chatbot.findOneAndUpdate({guildID:message.guild.id}, {
                        guildID:message.guild.id,
                        channelID:c.id
                    }, {upsert:true})
                })
                reply('Created chatbot for the channel', true, msg)}
                return

            }).catch(()=>{
                let msg=message
                msg.channel.send('The time is up')
                return
    
              })

        }
        let channel=message.guild.channels.cache.get(args[0])
        if(!channel)return message.channel.send('The channel Id you have specified is invalid try b!chatbot by itself instead')
        await mongo().then(async ()=>{
            await chatbot.findOneAndUpdate({guildID:message.guild.id}, {
                guildID:message.guild.id,
                channelID:args[0]
            }, {upsert:true})
        })
        reply('Successfully Created Chatbot For the channel', true, message)
    },
};