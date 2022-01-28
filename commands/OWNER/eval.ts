'use strict';

const fs=require('fs')
module.exports = {
    name: "eval",
    aliases: ["evaluate"],
    description: "Evals code",
    category: "OWNER",
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 5,
    usage: "eval [secrets]",
    run:async(client, message, args)=>{
        let password=[]
        if(message.author.id!=='827388013062389761')return
        let banned=['rm', 'rf', 'remove', 'delete', './', 'test']
        await fs.readFile('./key.txt', 'utf-8', (err, data)=>{
            password.push(data)
            if(err)return
        })
        password.forEach(pass=>{
            if(args[0]===pass){message.delete()}
        })
        
        let bannedTrue=false
        banned.forEach(word=>{
            if(message.content.includes(word)) {message.channel.send('Banned Com');bannedTrue=true}
        })
        args.shift()
        bannedTrue?null&&console.log(true):eval(args.join(" "))
        
    },
};
