import mongoose, { Schema } from 'mongoose'

const salesSchema = new Schema (
    {
        date:{
            type:Date,
            required:true
        },
        productName:{
            type:String,
            required:true
        },
        customerName:{
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        pricePerUnit:{
            type:Number,
            required:true
        },
        totalAmount:{
            type:Number,
            required:true
        }
    },
    {timestamps:true}
)

export const SalesModel = mongoose.model('sales', salesSchema)