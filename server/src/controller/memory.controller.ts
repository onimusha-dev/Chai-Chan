import { Request, Response, NextFunction } from 'express';
import {
    createOllamaMemory,
    getOllamaMemory,
} from '../service/memory.service';

interface MemoryRequestBody {
    userName: string
    modelName: string
    rowMemory: string
    modelPersona: string
}

export const createMemory = async (
    req: Request<{ userId: string }, {}, MemoryRequestBody>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { rowMemory, modelName, modelPersona, userName } = req.body;
        const { userId } = req.params;

        if (!userId && (!rowMemory || !modelName || !userName || !modelPersona)) throw Error('memory is empty');

        const newMemory = await createOllamaMemory(userId, rowMemory, modelName, userName, modelPersona);

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
    req: Request<{ userId: string }, {}, {}>,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { userId } = req?.params;

        if (!userId) throw Error('user id missing.');

        const memory = await getOllamaMemory(userId);

        return res.status(200).send({
            status: 200,
            data: memory
        });
    } catch (err) {
        console.log('error in the get memory controller. ' + err);
    }
};
