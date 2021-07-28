const mongoose=require('mongoose');
const countSchema=mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    voiceChannelID:{
        type:String,
        required:true
    }
}) 


module.exports=mongoose.model('countSchema', countSchema)