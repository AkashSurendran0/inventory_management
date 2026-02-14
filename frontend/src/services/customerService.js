import { api } from "../lib/api";

const backendRoute=import.meta.env.VITE_BACKEND_ROUTE

export const addNewCustomer = async (data) => {
    return await api.post(`${backendRoute}/v1/customer/customers`, data)
}

export const getAllCustomers = async (query) => {
    return await api.get(`${backendRoute}/v1/customer/customers?query=${query}`)
}

export const editCustomer = async (data, id) => {
    return await api.patch(`${backendRoute}/v1/customer/customers/${id}`, data)
}

export const deleteUser = async (id) => {
    return await api.delete(`${backendRoute}/v1/customer/customers/${id}`)
}