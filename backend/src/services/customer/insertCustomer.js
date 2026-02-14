import { addCustomer } from "../../repository/customer/customer.inventory.js"
import createError from "../../utils/errorHandler.util.js"
import { STATUS_CODES } from "../../utils/statusCode.util.js"

export const insertCustomer = async (data) => {
    const result=await addCustomer(data)
    if(!result.success) throw createError(STATUS_CODES.FORBIDDEN, 'Customer already exists')

    return result.newCustomer
}