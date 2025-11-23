/**
 * this list is for the user who can select the models as they want
 */
export const modelList = [
    // this is user model premium
    { model: 'gemma3:1b' as const, name: 'gemma3:1b' },
    { model: 'llama3.2:1b-text-q2_K', name: 'llama3.2:1b-text-q2_K' },

    // this is use model free
    { model: 'qwen2.5:0.5b' as const, name: 'qwen2.5:0.5b' },

    // for coding specially
    { model: 'qwen2.5-coder:0.5b' as const, name: 'qwen2.5-coder:0.5b' },
    { model: 'qwen2.5-coder:1.5b' as const, name: 'qwen2.5-coder:1.5b' },

    //  thinking specially
    { model: 'deepseek-r1:1.5b' as const, name: 'deepseek-r1:1.5b' },
    { model: 'qwen3:0.6b' as const, name: 'qwen3:0.6b' },
    { model: 'qwen3-vl:2b' as const, name: 'qwen3-vl:2b' },

    // multi lingual models
    { model: 'sailor2:1b' as const, name: 'sailor2:1b' },
];
