const mongo=require('../../botconfig/mongo')
const countingSchema=require('../../Schemas/countingSchema')

module.exports = {
    name: "counting",
    description: "Set up counting",
    category: "Administration",
    guildOnly: true,
    memberpermissions:"Administrator",
    adminPermOverride: true,
    cooldown: 5,
    usage: "counting <answer with true to reset on error or false to not > <channelID>",
    run:async(client, message, args)=>{
        await mongo().then()
    },
};