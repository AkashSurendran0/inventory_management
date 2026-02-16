import createError from "../../utils/errorHandler.util.js"
import { mailer } from "../../utils/mailer.js"
import { STATUS_CODES } from "../../utils/statusCode.util.js"

export const sendReportEmail = async (pdf) => {
    const base64Data = pdf.replace(/^data:application\/pdf;base64,/, "")
    const pdfBuffer = Buffer.from(base64Data, "base64")

    try {
        await mailer(pdfBuffer)
        return {success: true}
    } catch (error) {
        console.log(error)
        throw createError(STATUS_CODES.BAD_REQUEST, 'Mail not send, please try again later')
    }

}