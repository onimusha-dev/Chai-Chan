import express from "express";
import userRouter from "./user.router";
import sessionRouter from "./session.router";
import { getOllamaUsageByUserId } from "../controller/usage.controller";
const router = express.Router()


router.use('/auth', userRouter)
router.use('/session', sessionRouter)
router.get('/usage/:userId', getOllamaUsageByUserId)





export default router