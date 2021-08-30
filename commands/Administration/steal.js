const stealer=require('../../Constructors/stealEmoji')
module.exports = {
    name: "stealemoji",
    description: "steal an emoji from png or link",
    category: "Administration",
    guildOnly: true,
    memberpermissions:"MANAGE_EMOJIS",
    cooldown: 2,
    usage: "stealEmoji <emoji>",
    run:async(client, message, args)=>{
    stealer(message, args, {
        credit:false,
    })
    },
};