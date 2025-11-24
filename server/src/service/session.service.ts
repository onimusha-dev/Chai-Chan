import { ChatSession } from '../models/chats.model';

export const createOllamaSession = async (userId: string, name?: string) => {
    try {
        if (!name) name = 'New Chat';
        const newSession = new ChatSession({ name, user: userId });

        const session = await newSession.save();
        if (!session) {
            throw Error('error storing the chat in db.');
        }

        return { id: session.id, name: session.name, createdAt: session.createdAt };
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

    const cleaned = session.map(({ _id: id, user, __v, updatedAt, ...rest }) => ({
        id,
        ...rest,
    }));
    return cleaned;
};

export const updateOllamaSession = async (sessionId: string, name: string) => {
    try {
        const newSession = await ChatSession.findOneAndUpdate(
            { sessionId },
            { $set: { name: name } },
            { new: true },
        ).lean();

        if (!newSession) throw new Error('error updating session name');

        return { id: newSession._id, name: newSession.name, createdAt: newSession.createdAt };
    } catch (err) {
        console.log(err);
    }
};
