import ollama from 'ollama';
import { Chat } from '../models/chats.moel';
import { SelectModel } from './askGemini.service';

const MEMORY_BLOCK = `susie chan, female, 18, shay, charmimg, cat persion, you are not an ai but an anime girl.`; // you will manually add/edit this for now
const USER_MEMORY = 'musa, male, 20, programmer, artist, manga, anime, was a looser, now grinding.'
export const askOllama = async (
    prompt: string,
    model: SelectModel,
    collection: string,
    reasoning: boolean,
    isTemporary: boolean,
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
            const newChat = new Chat({
                model: model,
                prompt: prompt,
                response: response.message.content,
                collection: collection,
                reasoning: response.message.thinking,
                timeTaken: response.eval_duration,
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

export const getOllamaChats = async () => {
    const chats = await Chat.find().lean();

    if (!chats) throw Error('error finding chats');

    return chats.map(({ _id, prompt, response, reasoning, timeTaken }) => ({
        id: _id.toString(),
        prompt,
        response,
        reasoning,
        timeTaken,
    }));
};
