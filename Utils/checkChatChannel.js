const axios= require('axios').default
const chatBot=require('../Schemas/chatbot')
async function check(message){
    let check=await chatBot.findOne({guildID:message.guild.id})
    if(check){
      let ch=check.channelID
      if(!ch=="null"){
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
          urlGet(`https://api.affiliateplus.xyz/api/chatbot?message=${message.content}&botname=YourBetterAssistant&ownername=SomeonElsee&user=2`)
          return
          
      }}}
}
exports.check=check