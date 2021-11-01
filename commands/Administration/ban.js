'use strict';

const mongo = require('../../botconfig/mongo');
const serverConfSchema = require('../../Schemas/serverConfSchema');
const {reply}=require('../../exports')

module.exports = {
    name: "ban",
    description: "bans members",
    category: "Administration",
    guildOnly: true,
    memberpermissions:"BAN_MEMBERS",
    cooldown: 2,
    usage: "ban <member>",
    run:async(client,message, args)=>{
      const cache={}
      await mongo().then(async ()=>{
        try{
          let result=await serverConfSchema.findOne({_id:message.guild.id})
          let admin=result.adminroleID
          cache[message.guild.id]={admin}
        }catch(err){
          message.channel.send('Something occured while running the ban command')
        }
      })
            const user = message.mentions.members.first();
            // If we have a user mentioned
            var reason
            args[1]=reason
            if (user) {
              // Now we get the member from the user

              if(user.id===message.author.id)return message.channel.send("You can't ban yourself")
              if(user.id===client.application.id)return message.channel.send('I cannot ban myself')
              let admin=cache[message.guild.id].admin
              if(message.member.roles.cache.some(r=>r.id===admin))return reply('You cannot kick an admin+', true, message)
              // If the member is in the guild
              if (user) {
                /**
                 * Kick the member
                 * Make sure you run this on a member, not a user!
                 * There are big differences between a user and a member
                 */
                user
                  .ban(reason)
                  .then(() => {
                    // We let the message author know we were able to kick the person
                    reply(`Successfully Banned ${user.tag}`, true, message);
                  })
                  .catch(err => {
                    // An error happened
                    // This is generally due to the bot not being able to kick the member,
                    // either due to missing permissions or role hierarchy
                   reply('I was unable to Ban the member', true, message);
                    // Log the error
                    console.error(err);
                  });
              } else {
                // The mentioned user isn't in this guild
                reply("That user isn't in this guild!", true, message);
              }
              // Otherwise, if no user was mentioned
            } else {
              reply("You didn't mention the user to Ban!", true, message);
            }
    

    }
}
        

    
