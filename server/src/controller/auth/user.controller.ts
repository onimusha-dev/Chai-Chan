import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { env } from "../../config/env";
import { SignUpInput } from "../../validation/schema/auth/create";
import { sendOtpMailService } from "../../service/auth/otp.service";
import { getAuthenticatedUser, loginService, logoutService, refreshTokenService, resetPasswordService, signUpService } from "../../service/auth/auth.service";
import { IUserDocument } from "../../models/auth/user.model";
import { LoginInput } from "../../validation/schema/auth/login";

const signUp = asyncHandler(async (req: Request<{}, {}, SignUpInput>, res: Response, next: NextFunction)
    : Promise<Response | void> => {

    const { fullName, email, username, password, confirmPassword, termsAccept } = req.body;

    const newUser = await signUpService({
        fullName,
        email,
        username,
        password,
        confirmPassword,
        termsAccept
    })

    const sessionId = await sendOtpMailService(newUser)

    res.status(201).send({
        sessionId: sessionId,
        "message": "User created successfully"
    })
})

const login = asyncHandler(async (req: Request<{}, {}, LoginInput>, res: Response, next: NextFunction)
    : Promise<Response | void> => {

    const { emailOrUsername, password } = req.body;

    const user = await loginService({
        emailOrUsername,
        password
    })

    const sessionId = await sendOtpMailService(user)

    res.status(201)
        .send({
            sessionId: sessionId,
            "message": "User logged in successfully"
        })
})

const logout = asyncHandler(async (req: Request<{}, {}, string>, res: Response, next: NextFunction)
    : Promise<Response | void> => {

    const { accessToken } = req.cookies;
    if (!accessToken) {
        res.send("No refresh token provided")
        throw new Error("No refresh token provided")
    }

    await logoutService(accessToken)

    res.status(200)
        .clearCookie('refreshToken')
        .clearCookie('accessToken')
        .send("user logged out successfully")
})

export interface AuthenticatedRequest extends Request {
    user?: IUserDocument;
}

const authMe = asyncHandler(
    async (req: AuthenticatedRequest, res: Response): Promise<Response> => {

        const token =
            req.cookies.accessToken ||
            req.header('Authorization')?.replace('Bearer ', '');

        const user = await getAuthenticatedUser(token);

        if (!user) {
            return res.status(401).json({ auth: false });
        }

        return res.status(200).json({
            userId: user._id,
            username: user.username,
            email: user.email,
            auth: true
        });
    }
);

// @NOTE: Password reset controller

interface InputRequest extends Request {
    user?: IUserDocument
}

const resetPassword = asyncHandler(async (req: InputRequest, res: Response, next: NextFunction)
    : Promise<Response | void> => {

    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    const userId = req.user._id.toString()

    const data = {
        userId,
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword,
        confirmPassword: req.body.confirmPassword
    }

    await resetPasswordService(data)

    res.status(200)
        .json({
            "message": "Password reset successfully"
        })
})

const resetRefreshToken = asyncHandler(async (req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> => {

    const token = req.cookies.refreshToken || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401)
            .json({
                "message": "No refresh token provided"
            })
    }
    const { accessToken, refreshToken } = await refreshTokenService(token)

    return res.status(200)
        .cookie('accessToken', accessToken, {
            httpOnly: env.httpOnlyCookie,
            secure: env.secureCookie,
            maxAge: 24 * 60 * 60 * 1000
        })
        .cookie('refreshToken', refreshToken, {
            httpOnly: env.httpOnlyCookie,
            secure: env.secureCookie,
            maxAge: 24 * 60 * 60 * 1000
        })
        .json({
            "message": "Tokens refreshed successfully"
        })

})

export default {
    signUp,
    login,
    logout,
    authMe,
    resetRefreshToken,
    resetPassword

}