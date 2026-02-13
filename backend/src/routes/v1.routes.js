import { Router } from "express";
import AuthRouter from "./v1/auth.routes.js"
import InventoryRouter from "./v1/inventory.routes.js"

const router=Router()

router.use('/auth', AuthRouter)
router.use('/inventory', InventoryRouter)

export default router