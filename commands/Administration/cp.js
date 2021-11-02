

"use strict";
const {newCache}=require('../../Utils/prefix-load')
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
        if (!args[0])return message.channel.send(':face_exhaling: What am I changing the prefix to? Try again with the prefix this time')
                 let prefix=args[0]
                 // eslint-disable-next-line no-useless-escape
                 console.log()
                 if((message.mentions.channels).first()||(message.mentions.roles).first()||(message.mentions.members).first()||(message.mentions.users).first())return message.channel.send('Mentions of any type cannot be used as a prefix')
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
