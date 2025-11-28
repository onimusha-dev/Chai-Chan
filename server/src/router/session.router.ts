import express from 'express'
import { createSession, deleteSession, getSession, updateSession } from '../controller/session.controller';
import { authMiddleware } from '../middleware/auth.middleare';

const sessionRouter = express.Router()

sessionRouter.route('/:sessionId')
    .put(authMiddleware, updateSession)
    .delete(authMiddleware, deleteSession)

sessionRouter.route('/:userId')
    .get(authMiddleware, getSession)
    .post(authMiddleware, createSession)

export default sessionRouter