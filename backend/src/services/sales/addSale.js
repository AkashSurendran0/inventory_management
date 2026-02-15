import { decreaseQuantity } from "../../repository/inventory.repository.js"
import { addSale } from "../../repository/sales.respository.js"

export const insertNewSale = async (data) => {
    const product=await decreaseQuantity(data.productId, data.quantity)
    const sale=await addSale(data)

    return {product, sale}
}