import { Request, Response, NextFunction } from "express";
import { SelectModel } from "../service/askOllama.service";
import { askOllama } from "../service/askOllama.service";

interface requestBody {
    prompt: string
    model: SelectModel

}

export const chatOllama = async (req: Request<{}, {}, requestBody>, res: Response, next: NextFunction) => {
    try {
        const { prompt, model } = req.body;

        if (!prompt || !model) throw Error("Inputs are not provided!")

        const reply = await askOllama(prompt, model)

        if (!reply) throw Error("error on ollama controller!")

        setTimeout(() => {
            return res.status(200)
                .send({
                    status: 200,
                    response: reply
                })
        }, 10000);

    } catch (err) {
        console.error("error in chat controller" + '\n' + err)
        next(err)
    }
}