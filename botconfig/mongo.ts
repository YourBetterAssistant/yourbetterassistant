require('dotenv').config()
import mongoose from 'mongoose'
import { mongoPath } from 'config.json'

export default async()=>{

    await mongoose.connect(mongoPath).catch(err=>{
        console.log('error\n\n\n\n\n '+err)
    })
    return mongoose
}

