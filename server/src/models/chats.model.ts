import { model, Schema } from 'mongoose';

// chat session
const chatSessionSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        // collection: { type: String, required: false },
    },
    { timestamps: true },
);

// individual chat entries
const chatEntrySchema = new Schema({
    sessionId: {
        type: Schema.Types.ObjectId,
        ref: 'ChatSession',
        required: false,
    },
    model: { type: String, required: true },
    prompt: { type: String, required: true },
    reasoning: { type: String, required: false },
    response: { type: String, required: true },
    timeTaken: { type: Number, required: true },
});

export const ChatEntry = model('ChatEntry', chatEntrySchema);
export const ChatSession = model('ChatSession', chatSessionSchema);
