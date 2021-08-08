module.exports = {
    name: "invitelink",
    aliases: ["invite",'link'],
    description: "sends the invitelink of the bot",
    category: "Information",
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 2,
    usage: "invitelink",
    run:async(client, message, args)=>{
        const embed= new Discord.MessageEmbed()
        .setTitle('InviteLink')
        .setFooter('YourBetterAssistant')
        .setURL('https://bit.ly/3hliGsX')
        .setColor('AQUA')
        
        
    message.channel.send({embeds:[embed]});
    },
};