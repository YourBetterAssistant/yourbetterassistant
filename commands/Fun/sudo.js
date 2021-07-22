const {guildPrefixes}=require('../../events/guild/message')

  

module.exports = {
    name: "sudo",
    aliases: ["imitate"],
    description: "makes a webhook of the defined user",
    category: "Fun",
    guildOnly: true,
    memberpermissions:"MANAGE_WEBHOOKS",
    cooldown: 10,
    usage: "sudo <user> <message>",
    run:async(client,message, args) =>{
        let prefix= guildPrefixes[message.guild.id] || globalPrefix
        if(!args[0])return message.reply('Who is the user?')
        if(!args[1])return message.reply('What is the message?')
            
        const {sudo} = require('discord.sudo')
        const member = message.mentions.members.first()
        const msg = args.slice(1).join(" ")
        const sudoMessage = new sudo({
            setMessage: message,
            setText: msg, 
            setMember: member,
        })
        sudoMessage.start()

        if (message.content.startsWith(`${prefix}sudo`)){
              message.delete({timeout:1000})
          }
          if (message.content.startsWith(`${prefix}imitate`)){
            message.delete({timeout:1000})
        }

    },
};