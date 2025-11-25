import { model, Schema } from 'mongoose';

const memorySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    rawMemory: {
        type: String, 
        required: true,
    },
    summarisedMemory: {
        type: String, // summarised memory: allow ~200-word summaries
        required: true, // (≈1200–1500 characters depending on language)
        minlength: 3,
        maxlength: 2000,  
    },
});

export const Memory = model('Memory', memorySchema);
