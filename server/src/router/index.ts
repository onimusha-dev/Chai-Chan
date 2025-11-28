import express from "express";
import userRouter from "./user.router";
import sessionRouter from "./session.router";
const router = express.Router()


router.use('/auth', userRouter)
router.use('/session', sessionRouter)






export default router