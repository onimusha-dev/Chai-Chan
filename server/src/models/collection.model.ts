import { model, Schema } from "mongoose";

const collectionSchema = new Schema({
    name: {
        type: String,
        required: true
    },

})

export const Collection = model('Collection', collectionSchema)