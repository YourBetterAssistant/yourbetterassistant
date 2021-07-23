const {Sudo}=require('weky')

  

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
        if(!args[0])return message.reply('Who is the user?')
        if(!args[1])return message.reply('What is the message?')
        const msg = args.slice(1).join(" ")
        await Sudo({
            message: message,
            member: message.mentions.members.first(),
            text: msg,
            deleteMessage: true
        });
    }}
        