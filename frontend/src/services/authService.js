import { api } from "../lib/api";

const backendRoute=import.meta.env.VITE_BACKEND_ROUTE

export const loginUser = async (data) => {
    return await api.post(`${backendRoute}/v1/auth/login`, data)
}