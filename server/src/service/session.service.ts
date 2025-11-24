import { ChatSession } from '../models/chats.model';

export const createOllamaSession = async (userId: string, name?: string) => {
    try {
        if (!name) name = 'New Chat';
        const newSession = new ChatSession({ name, user: userId });

        const session = await newSession.save();
        if (!session) {
            throw Error('error storing the chat in db.');
        }

        return { id: session._id };
    } catch (err) {
        console.log(err);
    }
};

/**
 * @param userId
 * @returns
 *
 * this returns all the available sessions of the user
 */
export const getSessionByUserId = async (userId: string) => {
    const session = await ChatSession.find({ user: userId }).lean();

    if (!session) throw Error('error finding session.');

    const cleaned = session.map(({ user, __v, updatedAt, ...rest }) => rest);

    return cleaned;
};
