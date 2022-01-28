'use strict';

const mongoose=require('mongoose');
const workScehma=mongoose.Schema({
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