import { getAllSales } from "../../repository/sales.respository.js"

export const querySales = async () => {
    return await getAllSales()
}