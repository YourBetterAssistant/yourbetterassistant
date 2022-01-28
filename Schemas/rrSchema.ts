'use strict';

const mongoose=require('mongoose');
let reqStr={
    type:String,
    required:true
}
const rrSchema=mongoose.Schema({
    guildId:reqStr,
    role1:{
        type:Object,
        required:true
    },
    role2:{
        type:Object,
        required:true
    },
    messageId:reqStr
}) 


module.exports=mongoose.model('buttonRoles', rrSchema)