import { Schema, model, Types, Document } from "mongoose";

interface IModelUsage {
    model: string;
    prompt_eval_count: number;
    eval_count: number;
}

export interface IUserUsage extends Document {
    userId: Types.ObjectId;
    totalTokens: number;
    models: Map<string, IModelUsage>;
    updatedAt: Date;
}

const ModelUsageSchema = new Schema<IModelUsage>(
    {
        model: { type: String, required: true },
        prompt_eval_count: { type: Number, default: 0 },
        eval_count: { type: Number, default: 0 },
    },
    { _id: false }
);

const UserUsageSchema = new Schema<IUserUsage>(
    {
        userId: {
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
    this.totalTokens = Array.from(this.models.values()).reduce( (acc, usage) => {
        return acc + usage.prompt_eval_count + usage.eval_count;
    }, 0);

    this.updatedAt = new Date();
    next();
});

export const UserUsage = model<IUserUsage>("UserUsage", UserUsageSchema);