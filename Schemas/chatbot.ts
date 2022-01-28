'use strict';

const mongoose=require('mongoose');
const chatBot=mongoose.Schema({
    guildID:{
        type:String,
        required:true
    },
    channelID:{
        type:String,
        required:true
    }
}) 


module.exports=mongoose.model('chatBot', chatBot)