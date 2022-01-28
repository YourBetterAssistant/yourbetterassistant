'use strict';
const mongoose=require('mongoose');
const unknownCommand=mongoose.Schema({
    guildId:{
        type:String,
        required:true
    }
}) 


module.exports=mongoose.model('unknownCommand', unknownCommand)
