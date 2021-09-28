

"use strict";
const {prefixLoad, newCache}=require('../../Utils/prefix-load')
const mongo=require('../../botconfig/mongo')
const prefixSchema=require('../../Schemas/prefixSchema')
module.exports = {
    name: "changeprefix",
    aliases: ["cp","prefix"],
    description: "changes the prefix",
    category: "Administration",
    memberpermissions:"Administrator",
    cooldown: 60*2,
    usage: "changeprefix <prefix>",
    run:async(client, message, args)=>{
        if (!args[0])return message.channel.send(':face_exhaling: What am I changing the prefix to?')
                 let prefix=args[0]
                 await prefixSchema.findOneAndUpdate({
                     _id:message.guild.id
                 }, {
                    _id:message.guild.id,
                    prefix:prefix
                 }, {
                     upsert:true
                 })
                 message.channel.send(`Changed Prefix to ${prefix}`)
                 newCache()
                 









    },

};
