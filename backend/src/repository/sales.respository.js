import { SalesModel } from "../models/sales.model.js"

export const addSale = async (data) => {
    const newSale=await SalesModel.insertOne({
        date:data.date,
        productName:data.productName,
        customerName:data.customerName,
        quantity:data.quantity,
        pricePerUnit:data.pricePerUnit,
        totalAmount:data.totalAmount
    })

    return newSale
}

export const getAllSales = async () => {
    return await SalesModel.find()
}