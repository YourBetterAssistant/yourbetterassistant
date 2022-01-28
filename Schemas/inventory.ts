'use strict';

const mongoose=require('mongoose');
const inventory=mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    inventory:{
        type:Array,
        required:true,
    }
}) 


module.exports=mongoose.model('inventory', inventory)
