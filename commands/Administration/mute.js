const Discord = require('discord.js');
const mongo = require('../../botconfig/mongo');
const serverConfSchema=require('../../Schemas/serverConfSchema')
let roles={}
const {reply}=require('../../exports')
const ms=require('ms')
module.exports = {
    name: "mute",
    description: "Mute a user(note:@everyone should not be able to send messages) **Conversion list** \n 1sec=1000ms\n1min=60000ms\n1hr=3600000ms",
    category: "Administration",
    guildOnly: true,
    memberpermissions:"KICK_MEMBERS",
    cooldown: 5,
    usage: "mute <user> [duration in ms Conversion list provided] [reason]",
    run:async(client, message, args)=>{
        let user= message.mentions.users.first()
        let duration=args[1]
        let reason=args.slice(2).join(" ")
        if(!args[0])return reply('You need to mention a user!', true, message)
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
        if(!user){
            message.channel.send('Cannot find that user')
        }
            let memberrole=roles[message.guild.id].member
            let muterole=message.guild.roles.cache.find(role=>role.name==='muted')
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
            userID.roles.set([muterole])
            if (!reason)reason='Not Given'
            if(isNaN(duration))duration='Infinite'
            let embed= new Discord.MessageEmbed().setTitle('Mute')
            .setDescription(`${userID} was muted by ${message.author}`)
            .addField('Reason:', reason,true)
            .addField('Duration:', duration+'ms',true)
            .setColor('RANDOM')
            message.channel.send({embeds:[embed]})
    if(duration){
        setTimeout(function(){
            userID.roles.set([memberrole])
            let embed= new Discord.MessageEmbed().setTitle('Unmute')
            .setDescription(`${userID}'s mute has ended. The mute lasted ${duration}ms`)
            .setColor('RANDOM')
            message.channel.send({embeds:[embed]})
            
        }, ms(duration))
    }

            

        

        
       
       
        


      

        
    },
};
