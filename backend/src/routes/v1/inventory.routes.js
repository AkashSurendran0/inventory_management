import { Router } from "express";
import { addProduct, editProduct, getProducts } from "../../controllers/inventory.controller.js";

const router=Router()

router.get('/products', getProducts)
router.post('/products', addProduct)
router.patch('/products/:id', editProduct)

export default router