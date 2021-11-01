'use strict';

const mongoose=require('mongoose');
const levellingEnabled=mongoose.Schema({
    guildID:{
        type:String,
        required:true
    },
    enabled:{
        type:Boolean,
        required:true
    }
}) 


module.exports=mongoose.model('levellingEnabled', levellingEnabled)