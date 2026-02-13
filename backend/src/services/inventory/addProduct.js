import { insertProduct } from "../../repository/inventory/inventory.repository.js"
import createError from "../../utils/errorHandler.util.js"
import { STATUS_CODES } from "../../utils/statusCode.util.js"

export const addNewProduct = async (data) => {
    const result=await insertProduct(data)
    if(!result.success){
        throw createError(STATUS_CODES.FORBIDDEN, 'Product already exists')
    }
    return result.newProduct
}