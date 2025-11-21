import { createContext, useContext, useState, type ReactNode } from "react";

export interface ResponseItem {
    id: string;
    prompt: string;
    response: string;
}

export type Models = "gemma3:270m" | "smollm2:135m" | "granite4:350m" | "qwen2.5:0.5b";

interface IResponses {
    responses: ResponseItem[]
    setResponses: (r: ResponseItem[]) => void
    isThinking: boolean
    setIsThinking: (isThinking: boolean) => void
    model: Models
    setModel: (model: Models) => void
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

    return (
        <ResponseContext.Provider value={{ responses, isThinking, model, setResponses, setIsThinking, setModel }}>
            {children}
        </ResponseContext.Provider>
    );
};
