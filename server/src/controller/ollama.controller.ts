import { Request, Response, NextFunction } from "express";
import { createOllamaMemory, getOllamaChats, getOllamaMemory } from "../service/askOllama.service";
import { askOllama } from "../service/askOllama.service";
import { SelectModel } from "../service/askGemini.service";

interface ChatRequestBody {
    prompt: string
    model: SelectModel
    collection: string
    reasoning: boolean
}

export const chatOllama = async (req: Request<{}, {}, ChatRequestBody>, res: Response, next: NextFunction) => {
    try {
        const { prompt, model, collection, reasoning } = req.body;

        if (!prompt || !model || !collection || reasoning) throw Error("Inputs are not provided!")

        const reply = await askOllama(prompt, model, collection, reasoning)

        if (!reply) throw Error("error on ollama controller!")

        return res.status(200)
            .send({
                status: 200,
                response: reply,
                reasoning: reply.reasoning
            })

    } catch (err) {
        console.error("error in chat controller" + '\n' + err)
        next(err)
    }
}

export const getAllChat = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const chats = await getOllamaChats()

        res.status(200)
            .send(
                {
                    status: 200,
                    data: chats
                }
            )

    } catch (err) {
        console.log(err)
    }
}

interface MemoryRequestBody {
    memory: string
    userId?: string
}
export const createMemory = async (req: Request<{}, {}, MemoryRequestBody>, res: Response, next: NextFunction) => {
    try {
        const { memory, userId } = req.body

        if (!memory) throw Error("memory is empty")

        const newMemory = await createOllamaMemory(memory)


        setTimeout(() => {


            return res.status(200)
                .send(
                    {
                        status: 200,
                        memory: newMemory
                    }
                )

        }, 5000);

    } catch (err) {
        console.log("error in the get memory controller. " + err)
    }
}


export const getMemory = async (req: Request<{}, {}, MemoryRequestBody>, res: Response, next: NextFunction) => {
    try {

        const memory = await getOllamaMemory()

        setTimeout(() => {

            return res.status(200)
                .send(
                    {
                        status: 200,
                        memory: memory
                    }
                )

        }, 5000);


    } catch (err) {
        console.log("error in the get memory controller. " + err)
    }
}