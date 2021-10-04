const GhostPing = require('../../Constructors/ghostPing')
module.exports=async(client, message)=>{
    GhostPing.messageDelete(message)
}   