import { createContext, useContext, useState, type ReactNode } from 'react';

export interface ResponseItem {
    id: string;
    prompt: string;
    reasoning: string;
    response: string;
    timeTaken: number;
}

export interface SessionItem {
    id: string
    name: string
    createdAt: string

}
/**
 * this is for compresing memory "gemma3:270m" | "granite4:350m" | "granite4:350m"
 *
 */

export type Models =
    // this is user model premium
    | 'gemma3:1b'
    | 'llama3.2:1b-text-q2_K'

    // this is use model free
    | 'qwen2.5:0.5b'

    // for coding specially
    | 'qwen2.5-coder:0.5b'
    | 'qwen2.5-coder:1.5b'

    //  thinking specially
    | 'qwen3:0.6b'
    | 'qwen3-vl:2b'
    | 'deepseek-r1:1.5b'

    // multi lingual models
    | 'sailor2:1b';

interface IChat {
    responses: ResponseItem[];
    setResponses: (r: ResponseItem[]) => void;

    latestResponse: string;
    setLatestResponse: (latestResponse: string) => void;

    isThinking: boolean;
    setIsThinking: (isThinking: boolean) => void;

    // setting up models and it state
    model: Models;
    setModel: (model: Models) => void;

    isReasoning: boolean;
    setIsReasoning: (isReasoning: boolean) => void;

    isTemporary: boolean;
    setIsTemporary: (isTemporary: boolean) => void;

    //  this is the whole session data
    sessionList: SessionItem[]
    setSessionList: (s: SessionItem[]) => void

    // //  this is the current session selected
    // setSession: (session:)
}

// null to start, same as you had
const ResponseContext = createContext<IChat | null>(null);

export const useResponseContext = () => {
    const context = useContext(ResponseContext);

    if (!context) {
        throw new Error(
            'useResponseContext must be used within ResponseProvider',
        );
    }

    return context;
};

export const ResponseProvider = ({ children }: { children: ReactNode }) => {
    const [responses, setResponses] = useState<ResponseItem[]>([]);
    const [isThinking, setIsThinking] = useState(false);
    const [model, setModel] = useState<Models>('gemma3:1b');
    const [latestResponse, setLatestResponse] = useState('#');
    const [isReasoning, setIsReasoning] = useState(false);
    const [isTemporary, setIsTemporary] = useState(false);
    const [sessionList, setSessionList] = useState<SessionItem[]>([])

    return (
        <ResponseContext.Provider
            value={{
                responses,
                isThinking,
                model,
                latestResponse,
                isReasoning,
                isTemporary,
                sessionList,
                setResponses,
                setIsThinking,
                setModel,
                setLatestResponse,
                setIsReasoning,
                setIsTemporary,
                setSessionList
            }}
        >
            {children}
        </ResponseContext.Provider>
    );
};
