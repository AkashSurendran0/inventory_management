import { changeCustomerDetails } from "../services/customer/changeCustomerDetails.js"
import { getCustomers } from "../services/customer/getCustomers.js"
import { insertCustomer } from "../services/customer/insertCustomer.js"
import { removeCustomer } from "../services/customer/removeCustomer.js"
import { STATUS_CODES } from "../utils/statusCode.util.js"

export const addCustomer = async (req, res, next) => {
    try {
        const data=req.body
        const result=await insertCustomer(data)
        res.status(STATUS_CODES.OK).json({result})
    } catch (error) {
        next(error)
    }
}

export const getAllCustomers = async (req, res, next) => {
    try {
        let {query}=req.query
        if(!query || query == 'undefined') query=undefined
        const result=await getCustomers(query)
        res.status(STATUS_CODES.OK).json({result})
    } catch (error) {
        next(error)
    }
}

export const editCustomer = async (req, res, next) => {
    try {
        const data=req.body
        const {id} = req.params
        const result=await changeCustomerDetails(data, id)
        res.status(STATUS_CODES.OK).json({result})
    } catch (error) {
        next(error)
    }
}

export const deleteCustomer = async (req, res, next) => {
    try {
        const {id}=req.params
        const result=await removeCustomer(id)
        res.status(STATUS_CODES.OK).json({result})
    } catch (error) {
        next(error)
    }
} 