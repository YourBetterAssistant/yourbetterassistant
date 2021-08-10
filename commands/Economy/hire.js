const { MessageEmbed, MessageFlags } = require('discord.js');
const {reply, hiremongo}=require('../../exports')
const id=require('../../botconfig/id.json');
const workSchema = require('../../Schemas/workSchema');
module.exports = {
    name: "hire",
    description: "get a job",
    category: "Economy",
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 60*60*2,
    usage: "hire",
    run:async(client, message, args)=>{
        let embed=new MessageEmbed()
        .setTitle('Jobs!')
        .addFields(
            {name:'Instructions:', value:'tell me the id, just send it it chat'},
            {name:'ID:1', value:'Apprentice Commoner - Salary - 1000YBCs', inline:true},
            {name:'ID:2', value:'Couple - Salary - 2000YBCs', inline:true},
            {name:'ID:3', value:'Walmart Employee - Salary - 4000YBCs', inline:true},
            )
        .setColor('RANDOM')
       message.channel.send({embeds:[embed]})
        let filter=m=>m.author.id===message.author.id
        message.channel.awaitMessages({
            filter,
            max:1,
            time:20000,
            errors:['time']
        }).then(async (msg)=>{
            msg=msg.first()
            if(isNaN(msg.content))return reply('Not a number lost your chance try again in a couple of hours')
            if(msg.content.startsWith('1')){
                let j=id[1]
                hiremongo(msg, j, reply)
      
                }
            
            if(msg.content.startsWith('2')){
                let j=id[2]
                hiremongo(msg, j, reply)
                }
        
            
            if(msg.content.startsWith('3')){
                let j=id[3]
                hiremongo(msg, j, reply)
         
            }

        }).catch(collected=>{
            if(collected)return
            message.channel.send('Breh The Time Ended Try Again in a couple of hours')
        })
    },
};