import { deleteCustomer } from "../../repository/customer.repository.js"

export const removeCustomer = async (id) => {
    return await deleteCustomer(id)
}