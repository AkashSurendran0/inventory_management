import { addNewProduct } from "../services/inventory/addProduct.js"
import { changeProductDetails } from "../services/inventory/changeProductDetails.js"
import { removeProduct } from "../services/inventory/deleteProduct.js"
import { getAllProducts } from "../services/inventory/getAllProducts.js"
import { STATUS_CODES } from "../utils/statusCode.util.js"

export const getProducts = async (req, res, next) => {
    try {
        let {query}=req.query
        if(!query || query == 'undefined') query=undefined
        const result=await  getAllProducts(query)
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

export const deleteProduct = async (req, res, next) => {
    try {
        const {id}=req.params
        await removeProduct(id)
        res.status(STATUS_CODES.OK).json({success:true})
    } catch (error) {
        next(error)
    }
}