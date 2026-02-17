import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { generateAccessToken } from '../utils/token.util.js'

dotenv.config()

export const verifyJWT = async (req, res, next) => {
    const accessToken=req.cookies.token
    const refreshToken=req.cookies.refreshToken

    if (!accessToken && !refreshToken) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {

        const decoded=jwt.verify(accessToken, process.env.ACCESS_SECRET)
        req.user=decoded
        return next()

    } catch (error) {
        
        if(!accessToken){
            return res.status(401).json({ message: "Unauthorized" })
        }

        if (!refreshToken) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        try {

            const decodedRefresh=jwt.verify(refreshToken, process.env.REFRESH_SECRET)
            const payload = {
                id:decodedRefresh.id
            }
            const newAccessToken=generateAccessToken(payload)
            res.cookie("token", newAccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            })
            req.user = decodedRefresh
            next()

        } catch (error) {
            return res.status(401).json({ message: "Invalid refresh token" })
        }

    }
}