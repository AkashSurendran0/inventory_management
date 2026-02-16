import { api } from "../lib/api";

const backendRoute=import.meta.env.VITE_BACKEND_ROUTE

export const addNewSale = async (data) => {
    return await api.post(`${backendRoute}/v1/sale/sales`, data)
}

export const getSales = async () => {
    return await api.get(`${backendRoute}/v1/sale/sales`)
}

export const deleteSale = async (id) => {
    return await api.delete(`${backendRoute}/v1/sale/sales/${id}`)
}

export const sendEmail = async (blob) => {
    return await api.post(`${backendRoute}/v1/sale/email`, {blob: blob})
}