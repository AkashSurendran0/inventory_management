import { verifyLogin } from "../services/auth/verifyLogin.js"
import { STATUS_CODES } from "../utils/statusCode.util.js"

export const LoginUser = async (req, res, next) => {
    try {
        const {email, password}=req.body
        const result=await verifyLogin(email, password)
        res.cookie("token", result.accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
        })
        res.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
        })
        res.status(STATUS_CODES.OK).json({success:true})
    } catch (error) {
        next(error)
    }
}

export const VerifyMe = async (req, res, next) => {
    try {
        res.status(STATUS_CODES.OK).json({success:true})
    } catch (error) {
        next(error)
    }
}

export const LogoutUser = async (req, res, next) => {
    try {
        res.clearCookie('token')
        res.clearCookie('refreshToken')
        res.status(STATUS_CODES.OK).json({success:true})
    } catch (error) {
        next(error)
    }
}