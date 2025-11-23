/**
 * this list is for the user who can select the models as they want
 */
export const modelList = [
    // this is user model premium
    { model: 'deepseek-r1:1.5b', name: 'deepseek-r1:1.5b', reasoning: false } as const,
    { model: 'gemma3:1b', name: 'gemma3:1b', reasoning: false } as const,
    
    // this is use model free
    { model: 'qwen2.5:0.5b', name: 'qwen2.5:0.5b', reasoning: false } as const,
    { model: 'llama3.2:1b-text-q2_K', name: 'llama3.2:1b-text-q2_K', reasoning: false } as const,

    // for coding specially
    { model: 'qwen2.5-coder:0.5b', name: 'qwen2.5-coder:0.5b', reasoning: false } as const,
    { model: 'qwen2.5-coder:1.5b', name: 'qwen2.5-coder:1.5b', reasoning: false } as const,

    //  thinking specially
    { model: 'qwen3:0.6b', name: 'qwen3:0.6b', reasoning: true } as const,
    { model: 'qwen3-vl:2b', name: 'qwen3-vl:2b', reasoning: true } as const,

    // multi lingual models
    { model: 'sailor2:1b', name: 'sailor2:1b', reasoning: false } as const,
];
