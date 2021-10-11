'use strict';
const mongoose=require('mongoose');
const store=mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    items:{
        type:Array,
        required:true
    }
}) 


module.exports=mongoose.model('store', store)
