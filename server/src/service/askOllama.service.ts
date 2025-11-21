import ollama from 'ollama'

export type SelectModel = "gemma3:270m" | "smollm2:135m" | "granite4:350m"

export const askOllama = async (prompt: string, model: SelectModel) => {
    try {
        // const response = await ollama.chat({
        //     model: model,
        //     messages: [{ role: 'user', content: prompt }],
        // })
        
        const response =  {
            messages: {
                content: "message: "
            }
        };
        console.log(response);
        
        const id = crypto.randomUUID();

        return { id, response: response.messages.content + id}

    } catch (err) {
        console.log(err)
    }
}
