import { getAllCustomers, getAllCustomersByQuery } from "../../repository/customer.repository.js"

export const getCustomers = async (query) => {
    if(query){
        return await getAllCustomersByQuery(query)
    }else{
        return await getAllCustomers()
    }
}