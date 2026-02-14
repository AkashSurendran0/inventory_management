import { findProducts, findProductsByQuery } from "../../repository/inventory/inventory.repository.js"

export const getAllProducts = async (query) => {
    let products
    if(query){
        products=await findProductsByQuery(query)
    }else{
        products=await findProducts()
    }
    return products
}