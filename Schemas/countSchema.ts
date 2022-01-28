'use strict';

import mongoose from 'mongoose';
const countSchema=new mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    voiceChannelID:{
        type:String,
        required:true
    }
}) 


export default mongoose.model<IcountSchema>('countSchema', countSchema)
interface IcountSchema extends mongoose.Document{
    _id:string,
    voiceChannelID:string
}