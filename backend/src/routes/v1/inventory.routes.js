import { Router } from "express";
import { addProduct, deleteProduct, editProduct, getProducts } from "../../controllers/inventory.controller.js";

const router=Router()

router.get('/products', getProducts)
router.post('/products', addProduct)
router.patch('/products/:id', editProduct)
router.delete('/products/:id', deleteProduct)

export default router