'use strict';

import mongoose from 'mongoose';
const workScehma=new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    }
}) 

const WorkSchema=mongoose.model<IworkSchema>('workSchema', workScehma)
export default WorkSchema
interface IworkSchema extends mongoose.Document{
    userID:string,
    job:string
}