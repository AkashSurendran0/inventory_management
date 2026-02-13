import mongoose, { Schema } from 'mongoose'

const inventorySchema = new Schema (
    {
        name:{
            type:String,
            required:true
        },
        normalizedName:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        price:{
            type:Number,
            required:true
        }
    },
    {timestamps:true}
)

export const InventoryModel = mongoose.model('inventory', inventorySchema)