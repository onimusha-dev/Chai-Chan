import { Request, Response, NextFunction } from 'express';
import {
    createOllamaSession,
    deleteAllOllamaSessionsByUserId,
    deleteOllamaSession,
    getSessionByUserId,
    updateOllamaSession,
} from '../service/session.service';

// interface ChatRequestBody {
//     name: string
// }

export const createSession = async (
    req: Request<{ userId: string }, {}, {}>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { userId } = req.params;

        if (!userId)
            throw new Error('user id is needed to create a valid session');
        const newSession = await createOllamaSession(userId);

        if (!newSession) throw Error('error on ollama controller!');

        return res.status(200).send({
            status: 200,
            data: newSession,
        });
    } catch (err) {
        console.error('error in chat controller' + '\n' + err);
        next(err);
    }
};


export const getSession = async (
    req: Request<{ userId: string }, {}, {}>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { userId } = req.params;
        if (!userId) throw new Error('sessionId is missing!');

        const session = await getSessionByUserId(userId);

        if (!session) throw new Error('error retreativing chats!');

        return res.status(200).send({
            status: 200,
            data: session,
        });
    } catch (err) {
        console.log(err);
    }
};

export const updateSession = async (
    req: Request<{ sessionId: string }, {}, { name: string }>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { name } = req.body;
        const { sessionId } = req.params;

        if (!name || !sessionId) throw new Error('fields are empty');

        const session = await updateOllamaSession(sessionId, name);

        res.status(200).send({ status: 200, data: session });
    } catch (err) {
        console.log(err);
    }
};

export const deleteSession = async (
    req: Request<{ sessionId: string }>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { sessionId } = req.params;
        if (!sessionId) throw new Error('sessionId is missing!');

        const session = await deleteOllamaSession(sessionId);

        return res.status(200).send({
            status: 200,
            data: session,
        });
    } catch (err) {
        console.log(err);
    }
};

export const deleteAllSessionsByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const userId = req.user.id.toString();
        if (!userId) throw new Error('userId is missing!');
        const sessions = await deleteAllOllamaSessionsByUserId(userId);
        return res.status(200).send({
            status: 200,
            data: sessions,
        });
    } catch (err) {
        console.log(err);
    }
}
