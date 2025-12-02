import express from "express";
import userRouter from "./user.router";
import sessionRouter from "./session.router";
import { getUsageByUserId } from "../controller/usage.controller";
import { authMiddleware } from "../middleware/auth.middleare";
const router = express.Router()


router.use('/auth', userRouter)
router.use('/session', sessionRouter)
router.get('/usage', authMiddleware, getUsageByUserId)





export default router