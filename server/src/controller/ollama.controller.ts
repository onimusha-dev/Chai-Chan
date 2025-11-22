import { Request, Response, NextFunction, response } from "express";
import { getOllamaChats, askOllama } from "../service/askOllama.service";
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

        if (!prompt || !model || !collection || typeof reasoning !== "boolean") throw Error("Inputs are not provided!")

        const reply = await askOllama(prompt, model, collection, reasoning)

        if (!reply) throw Error("error on ollama controller!")

        return res.status(200)
            .send({
                status: 200,
                response: reply
            })

    } catch (err) {
        console.error("error in chat controller" + '\n' + err)
        next(err)
    }
}

export const getAllChat = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const chats = await getOllamaChats()

        return res.status(200)
            .send(
                {
                    status: 200,
                    chats: chats
                }
            )

    } catch (err) {
        console.log(err)
    }
}
