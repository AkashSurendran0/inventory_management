import { Router } from "express";
import { LoginUser } from "../../controllers/auth.controller.js";

const router=Router()

router.post('/login', LoginUser)

export default router