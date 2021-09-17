const workSchema = require("./Schemas/workSchema")
const mongo=require('./botconfig/mongo')
const economySchema=require('./Schemas/economySchema')
const {erroHandler:errHandler}=require('./handlers/errorHandler')
/**
 * @param content what the message is
 * @param mention type in true or false this determines if you are pinging the member or not
 * @param message The message paramater
 * */
function reply(content, mention, message){
    message.reply({ content:content, allowedMentions: { repliedUser: mention }})
  }
  exports.reply=reply
/**
 * @param msg message
 * @param j job
 * @param reply The message paramater
 * */
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
    catch(err){errHandler(msg)}
})}
exports.hiremongo=hiremongo
