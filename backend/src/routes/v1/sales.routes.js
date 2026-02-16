import { Router } from "express";
import { addSale, deleteSale, getSales } from "../../controllers/sales.controller.js";

const router=Router()

router.post('/sales', addSale)
router.get('/sales', getSales)
router.delete('/sales/:id', deleteSale)

export default router