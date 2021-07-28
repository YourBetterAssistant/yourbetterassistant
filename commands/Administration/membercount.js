const mongo = require('../../botconfig/mongo');
const countSchema=require('../../Schemas/countSchema')
module.exports = {
    name: "membercount",
    description: "Set up member count NOTE: if no id is provided a new vc will be created",
    category: "Administration",
    guildOnly: true,
    memberpermissions:"Administrator",
    cooldown: 25,
    usage: "membercount [VoiceChannelID]",
    run:async(client, message, args)=>{
        let channelID=args[0]
        if(channelID){
            await mongo().then(async (mongoose)=>{
                try{
                    await countSchema.findOneAndUpdate(
                        {_id:message.guild.id},
                        {
                            _id:message.guild.id,
                            voiceChannelID:channelID
                        },
                        {upsert:true})
                    message.channel.send(`#<#${channelID}> is now counting`)
                }finally{
                    mongoose.connection.close()
                }
            })
            
        }else{
            

            function vc(){message.guild.channels.create('Members:', {
                    type: "voice", //This create a text channel, you can make a voice one too, by changing "text" to "voice"
                    permissionOverwrites: [
                       {
                         id: message.guild.roles.everyone, //To make it be seen by a certain role, user an ID instead
                         deny: ['CONNECT'], //Deny permissions
                         allow: ['VIEW_CHANNEL', 'CREATE_INSTANT_INVITE'], //Allow permissions
                       }
                    ],
                  })
                }
                  vc()
                  message.lienReply('I have made you a channel called members get the id of that channel and then try the command again')

        }
        /*   
   const guild = client.guilds.get("566596189827629066");
   setInterval(function () {
      var memberCount = guild.members.filter(member => !member.user.bot).size;  
      var memberCountChannel = client.channels.get("626462657817477131");
      memberCountChannel.setName(`${guild.name} has ${memberCount} members!`);
   }, 1000);*/
    },
};