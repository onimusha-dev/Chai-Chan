import { Request, Response, NextFunction } from 'express';
import { getUsageByUserId } from '../service/usageTracker.service';


export const getOllamaUsageByUserId = async (
    req: Request<{ userId: string }, {}, {}>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { userId } = req.params;
        if (!userId) throw new Error('sessionId is missing!');

        const session = await getUsageByUserId(userId);

        if (!session) throw new Error('error retreativing chats!');

        return res.status(200).send({
            status: 200,
            data: session,
        });
    } catch (err) {
        console.log(err);
    }
};
