const shell=require('shelljs')
const {reply}=require('../../exports')
module.exports = {
    name: "pull",
    description: "pulls the latest version of this code from github",
    category: "OWNER",
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 2,
    usage: "pull",
    run:async(client, message, args)=>{
        let ownerId="827388013062389761"
        if(message.author.id!==ownerId){
            message.channel.send('You cannot pull');
            console.log('bruh')
            return
        }
          
        let link='https://www.github.com/NotTimIsReal/bbarevamp'
        reply(`Pulling from **${link}**`, true, message)
        shell.exec(`git pull ${link}`)
        
        message.reply('Do you want me to reboot')
        let filter=m=>m.author.id===message.author.id
        message.channel.awaitMessages({
            filter, 
            max:1,
            time:10000,
            errors:['time'],
        }).then(msg=>{
            msg=msg.first()
            if(msg.content.startsWith('yes')){
                shell.exec(' ./bash/downtime.sh && pm2 restart 0')}else{
                    return message.channel.send('Cancelled')
                }

        })

        
    },
};