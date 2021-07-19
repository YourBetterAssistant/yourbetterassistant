const {spawn}=require('child_process')
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
            if(msg.content.startsWith('no'))return message.channel.send('Cancelled')
            else{

                 message.reply("Restarting")
                 const process=spawn('python', ['../../python/restart.py'])
                 process.stdout.on('data', data=>{
                     console.log(data.toString())
                      })}
    

   
            
        })

    },
};