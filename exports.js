const workSchema = require("./Schemas/workSchema")
const mongo=require('./botconfig/mongo')

function reply(content, mention, message){
    message.reply({ content:content, allowedMentions: { repliedUser: mention }})
  }
  exports.reply=reply
async function hiremongo(msg, j, reply){
  await mongo().then(async()=>{
    try{await workSchema.findOneAndUpdate({
        userID:msg.author.id
    },
    {
        userID:msg.author.id,
        job:j
    },{upsert:true})
    msg.channel.send(`Your job is now ${j}`)}
    catch(err){console.log(`error\n\n ${err.stack}`)}
})}
exports.hiremongo=hiremongo