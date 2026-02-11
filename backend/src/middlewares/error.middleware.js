export const errorHandler = (err, req, res, next) => {
    console.log(err)

    const statusCode=err.statusCode || 500

    res.status(statusCode).json({
        success:false,
        error:{
            code:err.code || 'Internal server error',
            message:err.message || 'Something went wrong'
        }
    })
}