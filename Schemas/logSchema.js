const mongoose=require('mongoose');
const logSchema=mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    channelID:{
        type:String,
        required:true
    }
}) 


module.exports=mongoose.model('logSchema', logSchema)