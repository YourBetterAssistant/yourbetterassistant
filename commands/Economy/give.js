const money=require('../../Constructors/economy')
const currency=new money()
const {reply}=require('../../exports')
module.exports = {
    name: "donate",
    aliases: ["give"],
    description: "donate your YBCs to someone else",
    category: "Economy",
    memberpermissions:"VIEW_CHANNEL",
    cooldown: 10,
    usage: "give <coins> <user>",
    run:async(client, message, args)=>{
        if(isNaN(args[0])) return message.channel.send('That is not a real number')
        const member=message.mentions.members.first()
        args[1]=member
        let coins=args[0]
        if(!member)return message.channel.send('Who are you giving the coins to?')
        if(!coins)return message.channel.send('How many coins are you giving?')
        await currency.donate(member.id,parseInt(coins), message)
        reply(`You have given ${member}, ${coins}YBCs`, true, message)
    },
};