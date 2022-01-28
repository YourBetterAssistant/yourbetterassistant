import workSchema from "./Schemas/workSchema"
import mongo from './botconfig/mongo'
import errHandler from './handlers/errorHandler'
/**
 * @param content what the message is
 * @param mention type in true or false this determines if you are pinging the member or not
 * @param message The message paramater
 * */
export function reply(content, mention, message){
    message.reply({ content:content, allowedMentions: { repliedUser: mention }})
  }

/**
 * @param msg message
 * @param j job
 * */
export async function hiremongo(msg, j){
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
