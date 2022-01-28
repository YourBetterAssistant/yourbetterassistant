'use strict';
import mongoose from 'mongoose';
const economySchema=new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        unique: true
    },
    coins: {
        type: Number,
        required: true
    },
    bank: {
        type: Number,
        required: true
    },
    bankSpace: {
        type: Number,
        required: true,
    }
}) 

const EconomySchema=mongoose.model<Ischema>('economySchema', economySchema)
export default EconomySchema
interface Ischema extends mongoose.Document{
    userID:string,
    coins:number,
    bank:number,
    bankSpace:number
}
