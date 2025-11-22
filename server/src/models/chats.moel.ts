import { model, Schema } from "mongoose";

const chatSchema = new Schema({
    // id: {
    //     type: String,
    //     required: true
    // },
    model: {
        type: String,
        enum: [],
        required: true
    },
    prompt: {
        type: String,
        required: true
    },
    reasoning: {
        type: String,
        default: ''
    },
    response: {
        type: String,
        require: true
    },
    collection: {
        type: String,
        require: true
    }


})

export const Chat = model('Chat', chatSchema)