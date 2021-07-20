const shell=require('shelljs')
require('discord-reply')
module.exports = {
    name: "pull",
    description: "pulls the latest version of this code from github",
    category: "OWNER",
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 2,
    usage: "pull",
    run:async(client, message, args)=>{
        if(!message.author.id==='827388013062389761') return message.channel.send('You cannot pull')
        message.lineReply("Pulling!")
        shell.exec('git pull')
        
        message.reply('Do you want me to reboot')
        client.on('message', msg=>{
            if(!message.author.id==='827388013062389761')return
            if(msg.content.startsWith('no')) return message.channel.send('Cancelled')
            else{
                shell.exec('sudo reboot')
            }
                
            
    
        })

        
    },
};