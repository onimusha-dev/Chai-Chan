import { Schema, model, Types, Document } from "mongoose";

interface IModelUsage {
    model: string;
    prompt_eval_count: number;
    eval_count: number;
    total_duration: number;
    prompt_eval_duration: number;
    eval_duration: number;
}

export interface IUserUsage extends Document {
    user: Types.ObjectId;
    totalTokens: number;
    models: Map<string, IModelUsage>;
    updatedAt: Date;
}

const ModelUsageSchema = new Schema<IModelUsage>(
    {
        model: { type: String, required: true },

        prompt_eval_count: { type: Number, default: 0 },
        eval_count: { type: Number, default: 0 },

        total_duration: { type: Number, default: 0 },
        prompt_eval_duration: { type: Number, default: 0 },
        eval_duration: { type: Number, default: 0 },
    },
    { _id: false }
);

const UserUsageSchema = new Schema<IUserUsage>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        totalTokens: { type: Number, default: 0 },

        models: {
            type: Map,
            of: ModelUsageSchema,
            default: {},
        },

        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: false }
);

UserUsageSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

export const UserUsage = model<IUserUsage>("UserUsage", UserUsageSchema);


// tokenWallet: {
//     inputTokens: 50000,       // used for prompting any model
//         outputTokens: 20000,      // required for PRO models + high-cost outputs
//             purchasedTokens: 0,       // optional, if you want real transactions
//                 freeTierTokens: 70000,    // optional, resets monthly
// }
