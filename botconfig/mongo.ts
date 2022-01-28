require('dotenv').config()
const mongoose=require('mongoose')
const {mongoPath}=require('./config.json')

module.exports= async()=>{

    await mongoose.connect(mongoPath,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        keepAlive:true,

    }).catch(err=>{
        console.log('error\n\n\n\n\n '+err)
    })
    return mongoose
}

