const mongoose=require('mongoose')
const profileSchema=mongoose.Schema({
    guildID:{
        type:String,
        required:true,
    },
    userID:{
        type:String,
        required:true
    },
    coins:{
        type:Number,
        required:true
    },
    bank:{
        type:Number,
        require:true
    }
}) 


module.exports=mongoose.model('economySchema', profileSchema)