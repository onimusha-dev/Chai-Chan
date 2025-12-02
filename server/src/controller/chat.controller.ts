import { Request, Response, NextFunction } from 'express';
import { getOllamaChatsById, askOllama } from '../service/chat.service';
import { SelectModel } from '../types/ollama';

interface ChatRequestBody {
    prompt: string;
    model: SelectModel;
    collection: string;
    reasoning: boolean;
    isTemporary: boolean;
    sessionId: string;
}

export const chatOllama = async (
    req: Request<{}, {}, ChatRequestBody>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { prompt, model, collection, reasoning = false, isTemporary = false, sessionId, } = req.body;

        if (!prompt || !model || !collection || !sessionId || typeof reasoning !== 'boolean')
            throw Error('Inputs are not provided!');
        console.log(req.user.id)
        const reply = await askOllama(
            req.user.id,
            prompt,
            model,
            collection,
            reasoning,
            isTemporary,
            sessionId,
        );

        if (!reply) throw Error('error on ollama controller!');

        return res.status(200).send({
            status: 200,
            data: reply,
        });
    } catch (err) {
        console.error('error in chat controller' + '\n' + err);
        next(err);
    }
};

export const getAllChat = async (
    req: Request<{ sessionId: string }>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { sessionId } = req.params;
        if (!sessionId) throw new Error('sessionId is missing!');

        const chats = await getOllamaChatsById(sessionId);

        if (!chats) throw new Error('error retreativing chats!')

        return res.status(200).send({
            status: 200,
            data: chats,
        });
    } catch (err) {
        console.log(err);
    }
};
