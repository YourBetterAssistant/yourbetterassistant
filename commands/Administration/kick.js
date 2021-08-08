const mongo = require("../../botconfig/mongo");
const serverConfSchema = require("../../Schemas/serverConfSchema");
let cache={}
import {reply} from '../../index'
module.exports = {
    name: "kick",
    description: "kicks people",
    category: "Administration",
    guildOnly: true,
    memberpermissions:"KICK_MEMBERS",
    cooldown: 2,
    usage: "kick <member>",
    run:async(client,message, args)=>{
      await mongo().then(async (mongoose)=>{
        try{
          let result=await serverConfSchema.findOne({_id:message.guild.id})
          let admin=result.adminroleID
          cache[message.guild.id]={admin}
        }finally{
          mongoose.connection.close()
        }
      })
        const user = message.mentions.users.first();
        // If we have a user mentioned
        if (user) {
          // Now we get the member from the user
          const member = message.guild.member(user);
          if(member.id===message.author.id)return message.channel.send("You can't kick yourself")
          let admin=cache[message.guild.id].admin
          if(member.roles.cache.find(r=>r.id===admin))return reply('You cannot kick an admin+', true, message)
          // If the member is in the guild
          if (member) {
            /**
             * Kick the member
             * Make sure you run this on a member, not a user!
             * There are big differences between a user and a member
             */
            member
              .kick()
              .then(() => {
                // We let the message author know we were able to kick the person
                message.reply(`Successfully kicked ${user.tag}`);
              })
              .catch(err => {
                // An error happened
                // This is generally due to the bot not being able to kick the member,
                // either due to missing permissions or role hierarchy
                reply('I was unable to kick the member', true, message);
                // Log the error
                console.error(err);
              });
          } else {
            // The mentioned user isn't in this guild
            reply("That user isn't in this guild!", true, message);
          }
          // Otherwise, if no user was mentioned
        } else {
          reply("You didn't mention the user to kick!", true, message);
        }
  
    },
};