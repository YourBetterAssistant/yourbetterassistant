'use strict';

import mongoose from 'mongoose';
const automod=new mongoose.Schema({
    guildId: {
        type: String,
        required: true
    },
    strictMode: {
        type: Boolean,
        required: true
    }
}) 
export interface IUser extends mongoose.Document {
  guildId:string,
  strictMode:boolean
};
const model=mongoose.model<IUser>('autoMod',automod)

export default model