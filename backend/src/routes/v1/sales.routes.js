import { Router } from "express";
import { addSale, getSales } from "../../controllers/sales.controller.js";

const router=Router()

router.post('/sales', addSale)
router.get('/sales', getSales)

export default router