import { UserUsage } from "../models/modelUsage.model";


export const updateUsage = async (userId: string, model: string, promptEvalCount: number, evalCount: number) => {
    try {
        let userUsage = await UserUsage.findOne({ userId: userId });

        if (!userUsage) {
            userUsage = new UserUsage({
                userId: userId,
                models: new Map(),
            });
        }

        const modelUsage = userUsage.models.get(model) || {
            model: model,
            prompt_eval_count: 0,
            eval_count: 0
        };

        modelUsage.prompt_eval_count += promptEvalCount
        modelUsage.eval_count += evalCount
        userUsage.models.set(model, modelUsage)

        await userUsage.save();
    } catch (err) {
        console.error('Error updating usage:', err);
    }
}

export const getOllamaUsageByUserId = async (userId: string) => {
    try {
        const userUsage = await UserUsage.findOne({ userId: userId }).lean();

        if (!userUsage) {
            return null;
        }
        return {totalTokens: userUsage.totalTokens, models: userUsage.models}
    } catch (err) {
        console.error('Error retrieving usage:', err);
        return null;
    }
}