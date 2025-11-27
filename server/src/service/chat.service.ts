import ollama from 'ollama';
import { ChatEntry } from '../models/chats.model';
import { SelectModel } from '../types/ollama';
import { MEMORY_BLOCK } from '../utils/constants';

// export const askOllama = async (
//     prompt: string,
//     model: SelectModel,
//     collection: string,
//     reasoning: boolean,
//     isTemporary: boolean,
//     sessionId: string,
// ) => {
//     try {
//         console.log(prompt, model, collection, reasoning, isTemporary, sessionId)
//         const response = await ollama.chat({
//             model: model,
//             messages: [
//                 { role: 'system', content: `${MEMORY_BLOCK}` },
//                 { role: 'user', content: `${prompt}` },
//             ],
//             think: reasoning,
//         });

//         console.log(response);
//         if (isTemporary) {
//             const id = crypto.randomUUID();
//             return {
//                 id,
//                 response: response.message.content,
//                 reasoning: response.message.thinking,
//                 timeTaken: response.eval_duration,
//             };
//         } else {
//             const newChat = new ChatEntry({
//                 model: model,
//                 prompt: prompt,
//                 response: response.message.content,
//                 collection: collection,
//                 reasoning: response.message.thinking,
//                 timeTaken: response.eval_duration,
//                 sessionId: sessionId,
//             });

//             const chat = await newChat.save();
//             if (!chat) {
//                 throw Error('error storing the chat in db.');
//             }

//             return {
//                 id: newChat._id,
//                 response: newChat.response,
//                 reasoning: newChat.reasoning,
//                 timeTaken: newChat.timeTaken,
//             };
//         }
//     } catch (err) {
//         console.log(err);
//     }
// };

// export const getOllamaChatsById = async (sessionId: string) => {
//     const chats = await ChatEntry.find({ sessionId }).lean();

//     if (!chats) throw Error('error finding chats.');

//     return chats.map(({ _id, prompt, response, reasoning, timeTaken }) => ({
//         id: _id.toString(),
//         prompt,
//         response,
//         reasoning,
//         timeTaken,
//     }));
// };


/*  this is chat gpt generated */
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
            model,
            messages: [
                { role: 'system', content: `${MEMORY_BLOCK}` },
                { role: 'user', content: `${prompt}` },
            ],
            think: reasoning,
        });
        console.log(response)
        const meta = {
            model: model,
            total_duration: response.total_duration ?? 0,
            load_duration: response.load_duration ?? 0,
            prompt_eval_duration: response.prompt_eval_duration ?? 0,
            eval_duration: response.eval_duration ?? 0,
            prompt_eval_count: response.prompt_eval_count ?? 0,
            eval_count: response.eval_count ?? 0
        };
        if (isTemporary) {
            return {
                id: crypto.randomUUID(),
                response: response.message.content,
                reasoning: response.message.thinking,
                timeTaken: response.eval_duration,
                meta,
            };
        } else {
            const newChat = new ChatEntry({
                prompt,
                response: response.message.content,
                collection,
                reasoning: response.message.thinking,
                timeTaken: response.eval_duration,
                sessionId,
                meta,
            });

            const chat = await newChat.save();
            if (!chat) throw Error('error storing the chat in db.');
            return {
                id: newChat._id,
                response: newChat.response,
                reasoning: newChat.reasoning,
                timeTaken: newChat.timeTaken,
                meta: newChat.meta,
            };
        }
    } catch (err) {
        console.log(err);
    }
};

export const getOllamaChatsById = async (sessionId: string) => {
    const chats = await ChatEntry.find({ sessionId }).lean();

    if (!chats) throw Error('error finding chats.');

    return chats.map(({ _id, prompt, response, reasoning, timeTaken, meta }) => ({
        id: _id.toString(),
        prompt,
        response,
        reasoning,
        timeTaken,
        meta: meta,
    }));
};
