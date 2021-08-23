const fs=require('fs')
const Discord=require('discord.js')
function errorHandler(e, message){
    let embed=new Discord.MessageEmbed()
    .setColor("RED")
    .setTitle(`❌ ERROR | An error occurred`)
    .setDescription(`\`\`\`api error error has been logged\`\`\``)
    fs.writeFile('error.log', e.stack, err=>{
    if(err)return console.log('error writing the error lol')
    })
    if(!message)return
    return message.channel.send({embeds:[embed]

    });}
exports.erroHandler=errorHandler