const mongoose=require('mongoose');
const economySchema=mongoose.Schema({
    userID:{
        type:String,
        required:true,
        unique:true
    },
    coins:{
        type:Number,
        required:true
    },
    bank:{
        type:Number,
        required:true
    },
    bankSpace:{
        type:Number,
        required:true,
    }
}) 


module.exports=mongoose.model('economySchema', economySchema)