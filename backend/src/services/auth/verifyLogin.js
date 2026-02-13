import { findByEmail } from "../../repository/user/user.repository.js"
import createError from "../../utils/errorHandler.util.js"
import { STATUS_CODES } from "../../utils/statusCode.util.js"
import { generateAccessToken, generateRefreshToken } from "../../utils/token.util.js"

export const verifyLogin = async (email, password) => {
    const user=await findByEmail(email, password)
    console.log(user)
    if(!user){
        throw createError(STATUS_CODES.UNAUTHORIZED, 'User doesnt exist')
    }
    const passMatch = user.password === password
    if(!passMatch){
        throw createError(STATUS_CODES.UNAUTHORIZED, 'Password mismatch')
    }
    const payload = {
        id:user._id
    }
    const accessToken=generateAccessToken(payload)
    const refreshToken=generateRefreshToken(payload)

    return {
        accessToken,
        refreshToken
    }
}