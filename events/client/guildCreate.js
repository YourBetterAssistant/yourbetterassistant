'use strict';

const Discord=require('discord.js')
const { getPrettyDate } = require('../../handlers/functions')
module.exports=async(client, guild)=>{
    await guild.members.fetch({force:true})
    try{}catch(err){return}
    let possibleChannel=['chatting', 'general', 'chat', 'talk', 'speak', 'idk', 'bot-commands', 'bot', 'commands']
    let channel=[]
    let returnTrue
    let guildChannel='889412487768850432'
    guild.channels.cache.forEach(c=>{
        possibleChannel.forEach(ch=>{
            if(c.name.toLowerCase().includes(ch)){
                channel.push(c)
                return returnTrue=true
            }
            if(returnTrue==true)return
        })
    })
    
    let channelRandom = channel[Math.floor(Math.random()*channel.length)];
    const embed = new Discord.MessageEmbed()
        .setColor('ORANGE')
        .setTitle('Hello!')
        .setDescription('Hi I am YourBetterAssistant I suggest setting me up with my amazing administration commands as without doing that I will be rather useless. My prefix is `b!` so I suggest using b!help as you first command')
        .setTimestamp(new Date())
    
    channelRandom.send({embeds:[embed]})
    guildChannel=client.channels.cache.get(guildChannel)
    guildChannel.send(`New Joined Guild!\n name: ${guild.name} \n id:${guild.id}\ntime:${getPrettyDate()}`)
}