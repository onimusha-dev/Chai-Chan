import ollama from 'ollama'
import { Chat } from '../models/chats.moel';
import { SelectModel } from './askGemini.service';

export const askOllama = async (prompt: string, model: SelectModel, collection: string, reasoning: boolean, isTemporary: boolean) => {
    try {
        const response = await ollama.chat({
            model: model,
            messages: [{ role: 'user', content: prompt }],
            think: reasoning
        })

        if (isTemporary) {
            const id = crypto.randomUUID()
            return { id, response: response.message.content, reasoning: response.message.thinking, timeTaken: response.eval_duration }
            
        }
        else {
            const newChat = new Chat(
                {
                    model: model,
                    prompt: prompt,
                    response: response.message.content,
                    collection: collection,
                    reasoning: response.message.thinking,
                    timeTaken: response.eval_duration
                }
            )

            console.log(newChat.timeTaken / 1_000_000_000)

            const chat = await newChat.save()
            if (!chat) {
                throw Error('error storing the chat in db.')
            }

            return { id: newChat._id, response: newChat.response, reasoning: newChat.reasoning, timeTaken: newChat.timeTaken }
        }

    } catch (err) {
        console.log(err)
    }
}

export const getOllamaChats = async () => {
    const chats = await Chat.find().lean();

    if (!chats) throw Error("error finding chats");

    return chats.map(({ _id, prompt, response, reasoning, timeTaken }) => ({
        id: _id.toString(),
        prompt,
        response,
        reasoning,
        timeTaken

    }));
};

//  this is storing the memory of the user
export const createOllamaMemory = async (memory: string, userId?: string) => {
    try {

        return "new memory got created."

    } catch (err) {
        console.log(err)
    }
}


// this is for getting the memory of the user
export const getOllamaMemory = async () => {


    return 'this is your stored memory!'

}