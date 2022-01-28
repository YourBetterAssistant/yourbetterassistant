'use strict';

import mongoose from 'mongoose';
const inventory=new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    inventory: {
        type: Array,
        required: true,
    }
}) 

const Inventory=mongoose.model<Iinventory>('inventory', inventory)
export default Inventory
interface Iinventory extends mongoose.Document{
    userId:string,
    inventory:Array<string>
}