const mongoose=require('mongoose');
const workScehma=mongoose.Schema({
    guildID:{
        type:String,
        required:true
    },
    userID:{
        type:String,
        required:true
    },
    job:{
        type:String,
        required:true
    }
}) 


module.exports=mongoose.model('workSchema', workScehma)