import { verifyLogin } from "../services/auth/verifyLogin"

export const LoginUser = async (req, res, next) => {
    try {
        const {email, password}=req.body
        const result=await verifyLogin(email, password)
        
    } catch (error) {
        next(error)
    }
}