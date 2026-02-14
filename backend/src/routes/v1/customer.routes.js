import { Router } from "express";
import { addCustomer, deleteCustomer, editCustomer, getAllCustomers } from "../../controllers/customer.controller.js";

const router=Router()

router.post('/customers', addCustomer)
router.get('/customers', getAllCustomers)
router.patch('/customers/:id', editCustomer)
router.delete('/customers/:id', deleteCustomer)

export default router