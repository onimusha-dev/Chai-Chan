import express from 'express'
import { createSession, deleteSession, getSession, updateSession } from '../controller/session.controller';
import { authMiddleware } from '../middleware/auth.middleare';

const sessionRouter = express.Router()

sessionRouter.route('/:sessionId')
    .put( updateSession)
    .delete(deleteSession)

sessionRouter.route('/:userId')
    .get( getSession)
    .post( createSession)

export default sessionRouter