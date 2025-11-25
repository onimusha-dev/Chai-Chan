import { Router } from "express";
import authController from "../controller/auth/user.controller"
import { validator } from "../validation/validate";
import signUpSchema from "../validation/schema/auth/create";
import loginSchema from "../validation/schema/auth/login"
import { otpVerify } from "../controller/auth/otp.controller"
import otpVerifySchema from "../validation/schema/auth/otp";
import resetPasswordSchema from "../validation/schema/auth/resetPasword";
import { authMiddleware } from "../middleware/auth.middleare";


const userRouter = Router()

userRouter
    .post('/register', authController.signUp)
    .post('/login', authController.login)
    .post('/logout', authController.logout)
    .post('/refresh', authController.resetRefreshToken)
    .post('/otp-verify', validator(otpVerifySchema), otpVerify)
    .post('/reset-password', validator(resetPasswordSchema), authMiddleware, authController.resetPassword)

// validator(signUpSchema),
// validator(loginSchema),
export default userRouter;