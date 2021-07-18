module.exports = {
    name: "messagedelete",
    aliases: ["clear",'nuke','bulkdelete'],
    description: "deletes mass amount of messages",
    category: "Administration",
    guildOnly: true,
    memberpermissions:"MANAGE_MESSAGES",
    cooldown: 10,
    usage: "messagedelete <amount>",
    run:async(client, message, args)=>{
        if (!args[0]) return message.reply("Please enter the amount of messages to clear!");
 
        if(isNaN(args[0])) return message.reply("Please type a real number!");
 
        if(args[0] > 100) return message.reply("You can't remove more than 100 messages!");
        
        if(args[0] < 1) return message.reply("You have to delete at least one message!");
        let number=args[0]++
 
        await message.channel.messages.fetch({ limit: number}).then(messages =>{
            message.channel.bulkDelete(messages)
    });
 
        

    },
};