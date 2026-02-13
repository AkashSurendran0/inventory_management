import { api } from "../lib/api";

const backendRoute=import.meta.env.VITE_BACKEND_ROUTE

export const getAllProducts = async () => {
    return await api.get(`${backendRoute}/v1/inventory/products`)
}

export const addItem = async (data) => {
    return await api.post(`${backendRoute}/v1/inventory/products`, data)
}

export const editItem = async (data, id) => {
    return await api.patch(`${backendRoute}/v1/inventory/products/${id}`, data)
}