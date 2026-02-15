import { Router } from "express";
import AuthRouter from "./v1/auth.routes.js"
import InventoryRouter from "./v1/inventory.routes.js"
import CustomerRouter from "./v1/customer.routes.js"
import SalesRouter from "./v1/sales.routes.js"

const router=Router()

router.use('/auth', AuthRouter)
router.use('/inventory', InventoryRouter)
router.use('/customer', CustomerRouter)
router.use('/sale', SalesRouter)

export default router