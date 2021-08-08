const mongo = require('../../botconfig/mongo');
const serverConfSchema = require("../../Schemas/serverConfSchema");
import {reply} from '../../index'
module.exports = {
    name: "serverconf",
    description: "set up the server for the bot You also need to set up membercount,memberlog and welcome",
    category: "Administration",
    guildOnly: true,
    memberpermissions:"ADMINISTRATOR",
    cooldown: 5,
    usage: "serverconf <ownerroleID> <adminroleID> <memberroleID>",
    run:async(client, message, args)=>{
        if(!args[0])return reply('You need the owner role id to that right click the role and click copy id', true, message)
        if(!args[1])return reply('You need the admin role id to that right click the role and click copy id', true, message)
        if(!args[2])return reply('You need the member role id to that right click the role and click copy id', true, message)
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
                reply('The serverConf has been updated', true, message)
            }catch (err){
                reply('An error occured', true, message)
                throw err
            }
            finally{
                mongoose.connection.close()
            }
        })
    },
};