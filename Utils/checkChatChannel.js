const axios= require('axios').default
const chatBot=require('../Schemas/chatbot')
let cache={}
async function check(message){
    if(!cache[message.guild.id]){
    let check=await chatBot.findOne({guildID:message.guild.id})
    if(!check){
      cache[message.guild.id]=null
    }
    cache[message.guild.id]={check}
  }
    if(!cache[message.guild.id]==null){
    let ch=check.channelID
    if(ch){
    if(message.channel.id===ch){
        async function urlGet(url){
            let axios=require('axios').default
            axios.get(url)
          .then(function (response) {
            // handle success
            let c=message.guild.channels.cache.get(ch)
            c.send(response.data.message)
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
            
        }
        urlGet(`https://api.affiliateplus.xyz/api/chatbot?message=${message.content}&botname=YourBetterAssistant&ownername=SomeOneElse&user=1`)
        return
        
    }}}
}
exports.check=check