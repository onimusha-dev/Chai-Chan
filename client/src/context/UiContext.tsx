import { createContext, useContext, useState, type ReactNode } from 'react';
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
    isThinking: boolean;
    setIsThinking: (isThinking: boolean) => void;

    // setting up models and it state
    model: Models;
    setModel: (model: Models) => void;

    isReasoning: boolean;
    setIsReasoning: (isReasoning: boolean) => void;

    isTemporary: boolean;
    setIsTemporary: (isTemporary: boolean) => void;

}

// null to start, same as you had
const UiContext = createContext<IChat | null>(null);

export const useUiContext = () => {
    const context = useContext(UiContext);

    if (!context) {
        throw new Error(
            'useUiContext must be used within UiProvider',
        );
    }

    return context;
};

export const UiProvider = ({ children }: { children: ReactNode }) => {
    const [isThinking, setIsThinking] = useState(false);
    const [model, setModel] = useState<Models>('qwen3:0.6b');
    const [isReasoning, setIsReasoning] = useState(false);
    const [isTemporary, setIsTemporary] = useState(false);

    return (
        <UiContext.Provider
            value={{
                isThinking,
                model,
                isReasoning,
                isTemporary,
                setIsThinking,
                setModel,
                setIsReasoning,
                setIsTemporary,
            }}
        >
            {children}
        </UiContext.Provider>
    );
};
