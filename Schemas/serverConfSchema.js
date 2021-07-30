const mongoose=require('mongoose');
const serverConfSchema=mongoose.Schema({
    _id:{
        type:String,
        required:true,
    },
    memberroleID:{
        type:String,
        required:true
    },
    adminroleID:{
        type:String,
        required:true
    },
    ownerroleID:{
        type:String,
        required:true
    }
}) 


module.exports=mongoose.model('serverConfSchema', serverConfSchema)