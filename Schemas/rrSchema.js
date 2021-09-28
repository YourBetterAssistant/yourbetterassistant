'use strict';

const mongoose=require('mongoose');
let reqStr={
    type:String,
    required:true
}
const rrSchema=mongoose.Schema({
    _id:reqStr,
    role1:reqStr,
    role2:reqStr,
    emoji1:reqStr,
    emoji2:reqStr,
    channel:reqStr,
}) 


module.exports=mongoose.model('rrSchema', rrSchema)