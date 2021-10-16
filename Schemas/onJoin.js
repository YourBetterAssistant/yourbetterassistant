'use strict';

const mongoose=require('mongoose');
const joinroles=mongoose.Schema({
    guildId:{
        type:String,
        required:true,
        unique:true
    },
    roleId:{
        type:String,
        required:true
    }
}) 


module.exports=mongoose.model('joinroles', joinroles)