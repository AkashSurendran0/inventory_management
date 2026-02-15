import { insertNewSale } from "../services/sales/addSale.js"
import { querySales } from "../services/sales/querySales.js"
import { STATUS_CODES } from "../utils/statusCode.util.js"

export const addSale = async (req, res, next) => {
    try {
        const data=req.body
        const result=await insertNewSale(data)
        res.status(STATUS_CODES.OK).json({result})
    } catch (error) {
        next(error)
    }
}

export const getSales = async (req, res, next) => {
    try {
        const result=await querySales()
        res.status(STATUS_CODES.OK).json({result})
    } catch (error) {
        next(error)
    }
}