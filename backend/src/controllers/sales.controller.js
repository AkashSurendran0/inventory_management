import { insertNewSale } from "../services/sales/addSale.js"
import { querySales } from "../services/sales/querySales.js"
import { removeSale } from "../services/sales/removeSale.js"
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

export const deleteSale = async (req, res, next) => {
    try {
        const {id}=req.params
        const result=await removeSale(id)
        res.status(STATUS_CODES.OK).json({result})
    } catch (error) {
        next(error)
    }
}