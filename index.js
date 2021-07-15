const Discord=require('discord.js');
const config=require('./config.json')
const command=require('./command');
const { title } = require('process');
require('dotenv').config();
const client=new Discord.Client()
//Handlers
client.on('ready', ready=>{
    console.log('Logged into bot')
    client.user.setPresence({
        activity: {
            status:'online',
            name:'yo-ooyo',
            type:'Watching',
         
        }}).then('Presence Set') 
    command(client,'ping', (message)=>{
        var yourping = new Date().getTime() - message.createdTimestamp
        var botping = Math.round(client.ws.ping)
        let embed=new Discord.MessageEmbed()
        .setTitle('PONG')
        .addFields(
            {name:'My Ping', value:botping},
            {name:'Your Ping', value:yourping},)
        .setColor('#f54f')
                   
    
                
                            

        //message.channel.send(`PONG! Your ping: ${yourping} \nBots ping: ${botping}`)
        message.channel.send(embed)
            

                
            
        
    })
    

        

   
})

 client.login(process.env.TOKEN)

 /*client.once('ready', () => {
    client.user.setPresence({
        activity: {
            status: 'online',
            name: 'yo-ooyo coding',
            type: 'WATCHING'*/