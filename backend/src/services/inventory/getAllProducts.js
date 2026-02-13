import { findProducts } from "../../repository/inventory/inventory.repository.js"

export const getAllProducts = async () => {
    const products=await findProducts()
    return products
}