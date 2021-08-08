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
        let filter=m=>m.author.id===message.author.id
        message.channel.awaitMessages(filter, {
            max:1,
            time:10000,
            errors:['time'],
        }).then(msg=>{
            msg=msg.first()
            if(msg.content.startsWith('yes')){
                shell.exec('sudo reboot')}else{
                    return message.channel.send('Cancelled')
                }

        })

        
    },
};