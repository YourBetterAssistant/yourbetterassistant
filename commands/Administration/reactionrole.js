const Discord = require('discord.js');
const fs=require('fs');
const mongo = require('../../botconfig/mongo');
const rrSchema = require('../../Schemas/rrSchema');
const {reply}=require('../../exports')
module.exports = {
    name: "rr",
    aliases: ["reactionrole","reactionr"],
    description: "Reaction Role max of 3 is allowed",
    category: "Administration",
    guildOnly: true,
    memberpermissions:"MANAGE_ROLES",
    cooldown: 1,
    usage: "rr",
    run:async (client, message, args)=>{
        reply('Reply with the channel ID TIMEOUT:10s', true, message)
        let data={
            "GuildID":`${message.guild.id}`,
            "CID":null,
            "Emoji":null,
            "Emoji2":null,
            "Role1":null,
            "Role2":null,
        }
        fs.writeFile('commands/Administration/rr.json', JSON.stringify(data, null, 2), (err)=>{
            if(err)return
        })
        let filter = m => m.author.id === message.author.id
        //channelID
        await message.channel.awaitMessages({
            filter,
            max:1,
            time:100000,
            errors:['time']
        }).then(msg=>{
            msg=msg.first()
            let file=require('./rr.json')
            if(msg){
                if(isNaN(msg.content))return reply('That is not a channel ID', true, msg)
                console.log(msg.content)
                file.CID=`${msg.content.toLowerCase()}`
                let d=JSON.stringify(file)
                fs.writeFile('commands/Administration/rr.json', d, (err)=>{if(err)return})
            }
        }).catch(()=>{
            let msg=message
            msg.channel.send('The time is up')
            return
            //emoji1

          })
          message.channel.send('Now type the emoji')
          await message.channel.awaitMessages({
            filter,
            max:1,
            time:100000,
            errors:['time']
        }).then(msg=>{
            msg=msg.first()
            let file=require('./rr.json')
            if(msg){
                console.log(msg.content)
                file.Emoji=`${msg.content.toLowerCase()}`
                let d=JSON.stringify(file)
                fs.writeFile('commands/Administration/rr.json', d, (err)=>{if(err)return})
            }
        }).catch(()=>{
            let msg=message
            msg.channel.send('The time is up')
            return
          //emoji2
          })
          message.channel.send('I need the second emoji. If you do not need one reply with null')
          await message.channel.awaitMessages({
            filter, 
            max:1,
            time:100000,
            errors:['time']
        }).then(msg=>{
            msg=msg.first()
            let file=require('./rr.json')
            if(msg){
                console.log(msg.content)
                file.Emoji2=`${msg.content.toLowerCase()}`
                let d=JSON.stringify(file)
                fs.writeFile('commands/Administration/rr.json', d, (err)=>{if(err)return})
            }
        }).catch(()=>{
            let msg=message
            msg.channel.send('The time is up')
            return

          })
          //role1
          message.channel.send('Tell me the role like the name e.g Admin *case sensitive*\n This is for first Emoji')
          await message.channel.awaitMessages({
            filter, 
            max:1,
            time:100000,
            errors:['time']
        }).then(msg=>{
            msg=msg.first()
            let file=require('./rr.json')
            if(msg){
                console.log(msg.content)
                file.Role1=`${msg.content}`
                let d=JSON.stringify(file)
                fs.writeFile('commands/Administration/rr.json', d, (err)=>{if(err)return})
            }
        }).catch(()=>{
            let msg=message
            msg.channel.send('The time is up')
            return

          })
          //role2
          message.channel.send('Tell me the role like the name e.g Admin *case sensitive*\n This is for second Emoji\nType null if you do not have a second emoji')
          await message.channel.awaitMessages({
            filter, 
            max:1,
            time:100000,
            errors:['time']
        }).then(msg=>{
            msg=msg.first()
            let file=require('./rr.json')
            if(msg){
                console.log(msg.content)
                file.Role2=`${msg.content}`
                let d=JSON.stringify(file)
                fs.writeFile('commands/Administration/rr.json', d, (err)=>{if(err)return})
            }
        }).catch(()=>{
            let msg=message
            msg.channel.send('The time is up')
            return

          })
          //msg ID
        //code
        const f=require('./rr.json')

        let GID=f.GuildID
        let E1=f.Emoji
        let E2=f.Emoji2
        let R1=f.Role1
        let R2=f.Role2
        let C=f.CID
        await mongo().then(async(mongoose)=>{
            try{
            await rrSchema.findOneAndUpdate(
                {_id:message.guild.id},
                {
                    _id:message.guild.id,
                    role1:R1,
                    role2:R2,
                    emoji1:E1,
                    emoji2:E2,
                    channel:C,
                    
                },
                {upsert:true})}finally{mongoose.connection.close()}
        })
        message.channel.send('Setting Up the Roles....')
        await mongo().then(async(mongoose)=>{
            try{
                let result=await rrSchema.findOne({_id:message.guild.id})
                let C=result.channel
                let role1=result.role1
                let role2=result.role2
                let e1=result.emoji1
                let e2=result.emoji2
                let r1=message.guild.roles.cache.find(r=>r.name===role1)
                let r2=message.guild.roles.cache.find(r=>r.name===role2)
                let CH=message.guild.channels.cache.get(C)
                if(!CH)return message.channel.send('The channel ID you have given is invalid')
                if(!r2){
                    let embed=new Discord.MessageEmbed()
                    .setTitle('Reaction Role!')
                    .addField('Role', `${r1}`)
                    .setDescription(`React with ${e1} for the role ${r1}`)
                    let ME=await CH.send({embeds:embed})
                    ME.react(e1)
                }else{
                let embed=new Discord.MessageEmbed()
                .setTitle('Reaction Role!')
                .addField('Role', `${r1}`)
                .addField('Role', `${r2}`)
                .setDescription(`React with ${e1} for the role ${r1}\n or react with ${e2} for ${r2}`)
                let ME=await CH.send({embeds:embed})
                ME.react(e1)
                ME.react(e2)
            }}finally{mongoose.connection.close()}
        })
        


    },
};