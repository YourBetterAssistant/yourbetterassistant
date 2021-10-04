const GhostPing = require('../../Constructors/ghostPing')
module.exports=async(client, oldMessage, newMessage)=>{
    GhostPing.messageUpdate(oldMessage, newMessage)
}   