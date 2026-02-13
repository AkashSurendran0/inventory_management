import { addNewProduct } from "../services/inventory/addProduct.js"
import { changeProductDetails } from "../services/inventory/changeProductDetails.js"
import { getAllProducts } from "../services/inventory/getAllProducts.js"
import { STATUS_CODES } from "../utils/statusCode.util.js"

export const getProducts = async (req, res, next) => {
    try {
        const result=await  getAllProducts()
        res.status(STATUS_CODES.OK).json({result})
    } catch (error) {
        next(error)
    }
}

export const addProduct = async (req, res, next) => {
    try {
        const data=req.body
        const result=await addNewProduct(data)
        res.status(STATUS_CODES.OK).json({result})
    } catch (error) {
        next(error)
    }
}

export const editProduct = async (req, res, next) => {
    try {
        const data=req.body
        const {id}=req.params
        const result=await changeProductDetails(data, id)
        res.status(STATUS_CODES.OK).json({result})
    } catch (error) {
        next(error)   
    }
}