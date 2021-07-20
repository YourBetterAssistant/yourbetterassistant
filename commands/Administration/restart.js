const spawn=require('child_process').spawn()
module.exports = {
    name: "restart",
    aliases:['reboot'],
    description: "exclusive command only for creator",
    category: "Administration",
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 30,
    usage: "restart",
    run:async(client, message, args)=>{
        if(!message.author.id===827388013062389761)return message.channel.send("No, don't even try")
        message.channel.send('Are you sure?')
        client.on('message',(msg)=>{
            if(!msg.author.id===827388013062389761)return
            if(msg.content.includes('yes')){
                  message.reply("Restarting")
                  shell.exec('sudo reboot')
                  
            }
    

   
            
        })

    },
};