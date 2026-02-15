import { editCustomer } from "../../repository/customer.repository.js"
import createError from "../../utils/errorHandler.util.js"
import { STATUS_CODES } from "../../utils/statusCode.util.js"

export const changeCustomerDetails = async (data, id) => {
    const result=await editCustomer(data, id)
    if(!result.success){
        throw createError(STATUS_CODES.FORBIDDEN, 'User already exists')
    }

    return result.customer
}