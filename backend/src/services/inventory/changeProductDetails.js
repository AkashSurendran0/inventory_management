import { editProduct } from "../../repository/inventory/inventory.repository.js"

export const changeProductDetails = async (data, id) => {
    const result=await editProduct(data, id)
    if(!result.success){
        throw createError(STATUS_CODES.FORBIDDEN, 'Product already exists')
    }
    return result.product
}