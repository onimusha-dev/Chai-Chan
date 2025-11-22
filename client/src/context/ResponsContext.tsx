import { createContext, useContext, useState, type ReactNode } from "react";

export interface ResponseItem {
    id: string
    prompt: string
    response: string
}

export type Models = "gemma3:270m"
    | "smollm2:135m" | "smollm2:360m"
    | "granite4:350m"
    | "qwen2.5:0.5b" | "qwen2.5-coder:0.5b" | "qwen2.5-coder:1.5b"
    | "deepseek-r1:1.5b"
    | "tinyllama:1.1b"
    |"sailor2:1b"

interface IResponses {
    responses: ResponseItem[]
    setResponses: (r: ResponseItem[]) => void
    isThinking: boolean
    setIsThinking: (isThinking: boolean) => void
    model: Models
    setModel: (model: Models) => void
    latestResponse: string
    setLatestResponse: (latestResponse: string) => void

}

// null to start, same as you had
export const ResponseContext = createContext<IResponses | null>(null);

export const useResponseContext = () => {
    const context = useContext(ResponseContext);

    if (!context) {
        throw new Error(
            "useResponseContext must be used within ResponseProvider"
        );
    }

    return context;
};

export const ResponseProvider = ({ children }: { children: ReactNode }) => {
    const [responses, setResponses] = useState<ResponseItem[]>([]);
    const [isThinking, setIsThinking] = useState(false);
    const [model, setModel] = useState<Models>("gemma3:270m")
    const [latestResponse, setLatestResponse] = useState('#')

    return (
        <ResponseContext.Provider value={{ responses, isThinking, model, latestResponse, setResponses, setIsThinking, setModel, setLatestResponse }}>
            {children}
        </ResponseContext.Provider>
    );
};
