import mongoose, { Schema } from 'mongoose'

const customerSchema = new Schema (
    {
        name:{
            type:String,
            required:true
        },
        normalizedName:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        phone:{
            type:Number,
            required:true
        }
    },
    {timestamps:true}
)

export const CustomerModel = mongoose.model('customerss', customerSchema)