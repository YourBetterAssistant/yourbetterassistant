const shell=require('shelljs')
module.exports = {
    name: "pull",
    description: "pulls the latest version of this code from github",
    category: "OWNER",
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 2,
    usage: "pull",
    execute(message, args) {
        message.reply("Pulling!")
        try{shell.exec('git pull&&sudo reboot')
    }catch(err){
        message.channel.send(err)
    }
        
    },
};