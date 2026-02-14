import { getAllCustomers, getAllCustomersByQuery } from "../../repository/customer/customer.inventory.js"

export const getCustomers = async (query) => {
    if(query){
        return await getAllCustomersByQuery(query)
    }else{
        return await getAllCustomers()
    }
}