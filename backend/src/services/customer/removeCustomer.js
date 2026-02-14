import { deleteCustomer } from "../../repository/customer/customer.inventory.js"

export const removeCustomer = async (id) => {
    return await deleteCustomer(id)
}