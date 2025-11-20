import { createContext, useContext, useState, type ReactNode } from "react";

export interface ResponseItem {
    id: string;
    prompt: string;
    response: string;
}

interface IResponses {
    responses: ResponseItem[];
    setResponses: (r: ResponseItem[]) => void;
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
    // initialize with empty array, because that makes UI logic soooo much simpler
    const [responses, setResponses] = useState<ResponseItem[]>([]);

    return (
        <ResponseContext.Provider value={{ responses, setResponses }}>
            {children}
        </ResponseContext.Provider>
    );
};
