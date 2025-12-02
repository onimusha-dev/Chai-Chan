import { Request, Response, NextFunction } from 'express';
import { getOllamaUsageByUserId } from '../service/usageTracker.service';


export const getUsageByUserId = async (
    req: Request<{ userId: string }, {}, {}>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const usage = await getOllamaUsageByUserId(req.user!._id.toString());

        if (!usage && usage !== null) throw new Error('error retreativing chats!');

        return res.status(200).send({
            status: 200,
            data: usage,
        });
    } catch (err) {
        console.log(err);
    }
};
