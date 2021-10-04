const autoMod = require("../Schemas/autoMod");

async function checkAutoMod(message){
    let result=await autoMod.findOne({guildId:message.guild.id})
    if(!result)return {id:message.guild.id, strictmode:null}
    else return {id:message.guild.id, strictmode:result.strictMode}
    
}
exports.checkAutoMod=checkAutoMod