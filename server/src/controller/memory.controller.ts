import { Request, Response, NextFunction } from 'express';
import {
    createOllamaMemory,
    getOllamaMemory,
} from '../service/askMemory.service';

interface MemoryRequestBody {
    memory: string;
    userId?: string;
}
export const createMemory = async (
    req: Request<{}, {}, MemoryRequestBody>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { memory, userId } = req.body;

        if (!memory) throw Error('memory is empty');

        const newMemory = await createOllamaMemory(memory, userId);

        return res.status(200).send({
            status: 200,
            response: {
                length: newMemory?.length,
                memory: newMemory,
            },
        });
    } catch (err) {
        console.log('error in the get memory controller. ' + err);
    }
};

export const getMemory = async (
    req: Request<{ id: string }, {}, {}>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { id } = req?.params;

        if (!id) throw Error('user id missing.');

        const memory = await getOllamaMemory(id);

        return res.status(200).send({
            status: 200,
            data: {
              length: memory?.length,
              memory: memory,
            }
        });
    } catch (err) {
        console.log('error in the get memory controller. ' + err);
    }
};
