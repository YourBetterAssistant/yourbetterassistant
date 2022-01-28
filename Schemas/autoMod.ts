'use strict';

const mongoose=require('mongoose');
const automod=mongoose.Schema({
    guildId:{
        type:String,
        required:true
    },
    strictMode:{
        type:Boolean,
        required:true
    }
}) 


module.exports=mongoose.model('automod', automod)