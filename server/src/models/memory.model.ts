import { model, Schema } from 'mongoose';

const memorySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    userName: {
        type: String,
        required: false,
        trim: true,
        default: ''
    },
    modelName: {
        type: String,
        require: false,
        trim: true,
        default: ''
    },
    modelPersona: {
        type: String,
        require: false,
        trim: true
    },
    rawMemory: {
        type: String,
        required: true,
        trim: true,
        minlength: 50,
        maxlength: 2000,
        default: ''
    },
    vectorMemory: {
        type: String,
        required: true,
        trim: true,
        default: ''
    }
});

export const Memory = model('Memory', memorySchema);
