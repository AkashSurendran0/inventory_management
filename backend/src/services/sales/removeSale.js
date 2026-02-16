import { deleteSale } from "../../repository/sales.respository.js"

export const removeSale = async (id) => {
    return await deleteSale(id)
}