const Discord=require('discord.js')
const mongoCurrency=require('discord-mongo-currency-fork')
module.exports = {
    name: "work",
    description: "work ",
    category: "Economy",
    guildOnly: true,
    memberpermissions:"VIEW_CHANNEL",
    adminPermOverride: true,
    cooldown: 60*60*1,
    usage: "work",
    run:async(client, message, args)=>{
        message.lineReply("YOU HAVE BEEN AUTOMATICALLY ASSIGNED THE JOB `APPRENTICE COMMONER` MORE JOBS WILL BE ADDED LATER!")
        let job='APPRENTIC COMMONER'
        let possibleJobs=['FRIDGE', 'BUY', 'JOBS', 'TV', 'POLITICS', 'LIFE', 'CHILDREN']
        var item = possibleJobs[Math.floor(Math.random()*possibleJobs.length)];
        let embed=new Discord.MessageEmbed()
        .setTitle(`JOB:${job}`)
        .setDescription('YOU MUST TYPE THIS WORD IN CHAT TO COMPLETER YOUR JOB!')
        .addField(item)
        message.channel.send(embed)
        const randomCoins = Math.floor(Math.random() * 500) + 1;
        let filter = m => m.author.id === message.author.id
        message.channel.awaitMessages(filter, {
            max: 1,
            time: 30000,
            errors: ['time']
          }).then(msg=>{
            msg = msg.first()
            if (msg.content.includes() == item) {
              msg.channel.send(`CORRECT YOU HAVE EARNT 1000YBCs`)
              mongoCurrency.giveCoins(msg.author.id, msg.guild.id, 1000)
              return

            } else {
              msg.channel.send(`WRONG! YOU HAVE EARNT ${randomCoins}YBCs`)}
              mongoCurrency.giveCoins(msg.author.id, msg.guild.id, randomCoins)
              return

          }).catch(collected=>{
            msg.channel.send(`TIMES UP! YOU HAVE EARNT ${randomCoins}YBCs`)
            mongoCurrency.giveCoins(msg.author.id, msg.guild.id, randomCoins)
            return

          })
        


    },
};