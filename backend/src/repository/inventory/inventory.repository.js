import { InventoryModel } from "../../models/inventory.model.js";

export const findProducts = async () => {
    return await InventoryModel.find()
}

export const insertProduct = async (data) => {
    let existingProduct=await InventoryModel.findOne({normalizedName:data.name.toLowerCase()})
    if(existingProduct) return {success:false}
    const newProduct = await InventoryModel.insertOne({
        name:data.name,
        normalizedName:data.name.toLowerCase(),
        description:data.description,
        quantity:data.quantity,
        price:data.price
    })
    return {success:true, newProduct}
}

export const editProduct = async (data, id) => {
    let existingProduct=await InventoryModel.findOne({
        normalizedName:data.name.toLowerCase(),
        _id: { $ne: id }
    })
    if(existingProduct) return {success:false}
    const product = await InventoryModel.findByIdAndUpdate(
        id,
        {
            $set:{
                name:data.name,
                normalizedName:data.name.toLowerCase(),
                description:data.description,
                quantity:data.quantity,
                price:data.price
            }
        },
        { new: true }
    )
    return {success:true, product}
}