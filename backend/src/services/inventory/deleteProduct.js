import { deleteProduct } from "../../repository/inventory.repository.js"

export const removeProduct = async (id) => {
    const result=await deleteProduct(id)
    return result
}