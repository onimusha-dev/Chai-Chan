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

interface IChat {
    responses: ResponseItem[];
    setResponses: (r: ResponseItem[]) => void;

    latestResponse: string;
    setLatestResponse: (latestResponse: string) => void;

    //  this is the whole session data
    sessionList: SessionItem[]
    setSessionList: (s: SessionItem[]) => void

    // //  this is the current session selected
    // setSession: (session:)
}

// null to start, same as you had
const DataContext = createContext<IChat | null>(null);

export const useDataContext = () => {
    const context = useContext(DataContext);

    if (!context) {
        throw new Error(
            'useResponseContext must be used within ResponseProvider',
        );
    }

    return context;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
    const [responses, setResponses] = useState<ResponseItem[]>([]);
    const [latestResponse, setLatestResponse] = useState('#');
    const [sessionList, setSessionList] = useState<SessionItem[]>([])

    return (
        <DataContext.Provider
            value={{
                responses,
                latestResponse,
                sessionList,
                setResponses,
                setLatestResponse,
                setSessionList
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
