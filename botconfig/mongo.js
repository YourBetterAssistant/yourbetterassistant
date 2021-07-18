require('dotenv').config()
const mongoose=require('mongoose')
const {mongoPath}=process.env.MONGOPATH

module.exports= async()=>{

    await mongoose.connect(mongoPath)
    return mongoose
}

