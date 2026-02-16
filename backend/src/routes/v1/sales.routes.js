import { Router } from "express";
import { addSale, deleteSale, getSales, sendEmail } from "../../controllers/sales.controller.js";

const router=Router()

router.post('/sales', addSale)
router.get('/sales', getSales)
router.delete('/sales/:id', deleteSale)
router.post('/email', sendEmail)

export default router