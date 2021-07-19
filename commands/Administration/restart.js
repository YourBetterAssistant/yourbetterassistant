const {spawn}=require('child_process')
module.exports = {
    name: "restart",
    description: "exclusive command only for creator",
    category: "Administration",
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 30,
    usage: "restart",
    run:async(client, message, args)=>{
        if(!message.author.id===827388013062389761)return message.channel.send("No, don't even try")
        message.channel.send('Are you sure?')
        if(message.content.startsWith('no')) return
        else{ 
            //Need to push!
            message.reply("Restarting")
            const process=spawn('python', ['../../python/restart.py'])
            process.stdout.on('data', data=>{
            console.log(data.toString())
    

    })}

    },
};