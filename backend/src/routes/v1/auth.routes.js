import { Router } from "express";
import { LoginUser, LogoutUser, VerifyMe } from "../../controllers/auth.controller.js";
import { verifyJWT } from "../../middlewares/jwt.middleware.js";

const router=Router()

router.post('/login', LoginUser)
router.get('/me', verifyJWT, VerifyMe)
router.post('/logout', LogoutUser)

export default router