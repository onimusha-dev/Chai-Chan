import { Request, Response, NextFunction } from 'express';
import { createOllamaSession, getSessionByUserId } from '../service/session.service';

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
            response: newSession,
        });
    } catch (err) {
        console.error('error in chat controller' + '\n' + err);
        next(err);
    }
};

export const getSession = async (
    req: Request<{ userId: string }>,
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
