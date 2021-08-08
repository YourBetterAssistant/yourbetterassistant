const Discord = require('discord.js');
const mongo = require('../../botconfig/mongo');
const serverConfSchema=require('../../Schemas/serverConfSchema')
let roles={}
import {reply} from '../../index'
const ms=require('ms')
module.exports = {
    name: "unmute",
    description: "unmute a user",
    category: "Administration",
    guildOnly: true,
    memberpermissions:"KICK_MEMBERS",
    cooldown: 5,
    usage: "unmute <user>",
    run:async(client, message, args)=>{
        let user= message.mentions.users.first()
        let duration=args[1]
        let reason=args.slice(2).join(" ")
        if(!args[0])return message.reply('You need to mention a user!', true, message)
        if(!user){
            message.channel.send('Cannot find that user')
        }else{
            await mongo().then(async(mongoose)=>{
                try{
                    let result= await serverConfSchema.findOne({_id:message.guild.id})
                    let admin=result.adminroleID
                    let member=result.memberroleID
                    let owner=result.ownerroleID
                    roles[message.guild.id]={admin, member, owner}
                }finally{
                    mongoose.connection.close()
                }
            })
            let memberrole=roles[message.guild.id].member
            let muterole=message.guild.roles.cache.get(role=>role.name==='muted')
            if(!muterole){
                message.guild.roles.create({
                    data: {
                      name: 'muted',
                      color: 'BLUE',
                      permissions:['VIEW_CHANNEL'],
                    },
                    reason: 'muted role does not exist',
                  }).catch(console.error);
                    
            }

            if(!memberrole)return reply('Member role is not added to serverconf please add it with {prefix}serverconf', true, message)
            let userID=message.guild.members.cache.get(user.id)
            userID.roles.set([memberrole])
         
            let embed= new Discord.MessageEmbed().setTitle('unmute')
            .setDescription(`${userID} was unmuted by ${message.author}`)
            .setColor('RANDOM')
            message.channel.send({embeds:[embed]})

            
        }
       
       
        


      

        
    },
};
