const mongo = require('../../botconfig/mongo');
const serverConfSchema = require("../../Schemas/serverConfSchema");

module.exports = {
    name: "serverconf",
    description: "set up the server for the bot You also need to set up membercount,memberlog and welcome",
    category: "Administration",
    guildOnly: true,
    memberpermissions:"ADMINISTRATOR",
    cooldown: 5,
    usage: "serverconf <ownerroleID> <adminroleID> <memberroleID>",
    run:async(client, message, args)=>{
        if(!args[0])return message.lineReply('You need the owner role id to that right click the role and click copy id')
        if(!args[1])return message.lineReply('You need the admin role id to that right click the role and click copy id')
        if(!args[2])return message.lineReply('You need the member role id to that right click the role and click copy id')
        let member=args[2]
        let admin=args[1]
        let owner=args[0]
        await mongo().then(async (mongoose)=>{
            try{
                await serverConfSchema.findOneAndUpdate({
                    _id:message.guild.id
                },
                {_id:message.guild.id,
                 memberroleID:member,
                 adminroleID:admin,
                 ownerroleID:owner
                },
                {upsert:true})
                message.lineReply('The serverConf has been updated')
            }catch (err){
                message.lineReply('An error occured')
                throw err
            }
            finally{
                mongoose.connection.close()
            }
        })
    },
};