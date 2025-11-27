import { model, Schema } from 'mongoose';

// chat session
const chatSessionSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true },
);

// individual chat entries
const chatEntrySchema = new Schema(
    {
        sessionId: {
            type: Schema.Types.ObjectId,
            ref: 'ChatSession',
            required: false,
        },
        prompt: { type: String, required: true },
        reasoning: { type: String, required: false },
        response: { type: String, required: true },
        timeTaken: { type: Number, required: true },
        
        meta: {
            model: { type: String, required: true },
            total_duration: { type: Number, default: 0 },       // full wall-clock time
            load_duration: { type: Number, default: 0 },        // model load / warmup
            prompt_eval_duration: { type: Number, default: 0 }, // prompt token evaluation
            eval_duration: { type: Number, default: 0 },        // output token generation

            // optional counts if you want them stored too
            prompt_eval_count: { type: Number, default: 0 },
            eval_count: { type: Number, default: 0 },
        },
    },
    { timestamps: true },
);

export const ChatEntry = model('ChatEntry', chatEntrySchema);
export const ChatSession = model('ChatSession', chatSessionSchema);
