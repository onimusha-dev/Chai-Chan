import ollama from 'ollama';
import { ChatEntry } from '../models/chats.model';
import { SelectModel } from '../types/ollama';
import { MEMORY_BLOCK } from '../utils/constants';

export const askOllama = async (
    prompt: string,
    model: SelectModel,
    collection: string,
    reasoning: boolean,
    isTemporary: boolean,
    sessionId: string,
) => {
    try {
        const response = await ollama.chat({
            model: model,
            messages: [
                { role: 'system', content: `${MEMORY_BLOCK}` },
                { role: 'user', content: `${prompt}` },
            ],
            think: reasoning,
        });

        console.log(response);
        if (isTemporary) {
            const id = crypto.randomUUID();
            return {
                id,
                response: response.message.content,
                reasoning: response.message.thinking,
                timeTaken: response.eval_duration,
            };
        } else {
            const newChat = new ChatEntry({
                model: model,
                prompt: prompt,
                response: response.message.content,
                collection: collection,
                reasoning: response.message.thinking,
                timeTaken: response.eval_duration,
                sessionId: sessionId,
            });

            const chat = await newChat.save();
            if (!chat) {
                throw Error('error storing the chat in db.');
            }

            return {
                id: newChat._id,
                response: newChat.response,
                reasoning: newChat.reasoning,
                timeTaken: newChat.timeTaken,
            };
        }
    } catch (err) {
        console.log(err);
    }
};

export const getOllamaChatsById = async (sessionId: string) => {
    const chats = await ChatEntry.find({ sessionId }).lean();

    if (!chats) throw Error('error finding chats.');

    console.log('getollamachatbyid')
    return chats.map(({ _id, prompt, response, reasoning, timeTaken }) => ({
        id: _id.toString(),
        prompt,
        response,
        reasoning,
        timeTaken,
    }));
};
