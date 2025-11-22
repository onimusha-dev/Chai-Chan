import ollama from 'ollama'
import { Chat } from '../models/chats.moel';
import { Collection } from '../models/collection.model';

export type SelectModel = "gemma3:270m" | "smollm2:135m" | "granite4:350m" | "qwen2.5:0.5b"

export const askOllama = async (prompt: string, model: SelectModel, collection: string) => {
    try {
        const response = await ollama.chat({
            model: model,
            messages: [{ role: 'user', content: prompt }],
        })
        console.log(response);

        // const id = crypto.randomUUID();

        const newChat = new Chat(
            {
                // id: id,
                model: model,
                prompt: prompt,
                collection: collection
            }
        )
        console.log(newChat)

        const chat = await newChat.save()
        if (!chat) {
            throw Error('error storing the chat in db.')
        }

        return { id: newChat._id, response: response.message.content }

    } catch (err) {
        console.log(err)
    }
}

export const getOllamaChats = async () => {
    const chats = await Chat.find().lean()

    if (!chats) throw Error("error finding chats")

    return chats
}

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