import ollama from 'ollama'
import { Chat } from '../models/chats.moel';
import { SelectModel } from './askGemini.service';

export const askOllama = async (prompt: string, model: SelectModel, collection: string, reasoning?: boolean,) => {
    try {console.log(model)
        const response = await ollama.chat({
            model: model,
            messages: [{ role: 'user', content: prompt }],
            think: false
        })

        const newChat = new Chat(
            {
                model: model,
                prompt: prompt,
                response: response.message.content,
                collection: collection,
                reasoning: response.message.thinking
            }
        )

        const chat = await newChat.save()
        if (!chat) {
            throw Error('error storing the chat in db.')
        }

        return { id: newChat._id, response: newChat.response, reasoning: newChat.reasoning }

    } catch (err) {
        console.log(err)
    }  
}

export const getOllamaChats = async () => {
    const chats = await Chat.find().lean();

    if (!chats) throw Error("error finding chats");

    return chats.map(({ _id, prompt, response, reasoning }) => ({
        id: _id.toString(),
        prompt,
        response,
        reasoning
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