const mongoose=require('mongoose');
const coutingSchema=mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    reset:{
        type:Boolean,
        required:true
    },
    channelID:{
        type:String,
        required:true
    }
}) 


module.exports=mongoose.model('countSchema', countSchema)