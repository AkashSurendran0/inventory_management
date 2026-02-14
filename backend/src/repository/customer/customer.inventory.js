import { CustomerModel } from "../../models/customer.model.js"

export const addCustomer = async (data) => {
    const existingCustomer = await CustomerModel.findOne({normalizedName:data.name.toLowerCase()})
    if(existingCustomer) return {success:false}

    const newCustomer = await CustomerModel.insertOne(
        {
            name:data.name,
            normalizedName:data.name.toLowerCase(),
            address:data.address,
            phone:data.phone
        }
    )
    return {success:true, newCustomer}
}

export const getAllCustomers = async () => {
    return await CustomerModel.find()
}

export const getAllCustomersByQuery = async (query) => {
    return await CustomerModel.find({
        normalizedName:{$regex:query, $options:'i'}
    })
}

export const editCustomer = async (data, id) => {
    const existingCustomer = await CustomerModel.findOne({
        normalizedName:data.name.toLowerCase(),
        _id:{$ne:id}
    })
    if(existingCustomer) return {success:false}

    const customer=await CustomerModel.findByIdAndUpdate(
        id,
        {$set:{
            name:data.name,
            normalizedName:data.name.toLowerCase(),
            address:data.address,
            phone:data.phone
        }},
        {new:true}
    )
    return {success:true, customer}
}

export const deleteCustomer = async (id) => {
    return await CustomerModel.findByIdAndDelete(id)
}