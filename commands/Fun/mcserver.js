const util=require('minecraft-server-util')
const Discord=require('discord.js')
module.exports = {
    name: "mcserver",
    aliases: ["miencraft", 'server'],
    description: "Display stats bout teh server you asked for",
    category: "Fun",
    cooldown: 2,
    usage: "mcserver <ip> <port>",
    run:async(client, message, args)=>{
        if (!args[0])return message.channel.send('the server ip mate')
        if(!args[1])return message.channel.send('and the port(normally 25565)')
        const ip=args[0]
        const port=args[1]

        util.status(ip, {port: parseInt(port)}).then((response)=>{
            const embed= new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('MC SERVER RESULTS!')
            .addFields(
                {name:'Server IP:', value: response.host, inline:true},
                {name:'Players Online:', value:`${response.onlinePlayers}`, inline:true},
                {name:'Version Required:', value:response.version, inline:true},
                {name:'Description:', value:response.description.descriptionText, inline:true},
                {name:'Max Players:', value:`${response.maxPlayers}` , inline:true}
                
                
            )
            message.channel.send({embeds:[embed]})

        }).catch((error)=>{
            message.channel.send('Something Happened')
            throw error;
        })
        

    },
};