import type { PopoverStats } from '@/types/response';
import { createContext, useContext, useState, type ReactNode } from 'react';

export interface ResponseItem {
    id: string;
    prompt: string;
    reasoning: string;
    response: string;
    timeTaken: number;
    meta: PopoverStats
}

export interface SessionItem {
    sessionId: string
    name: string
    createdAt: string

}

interface IChat {
    responses: ResponseItem[];
    setResponses: (r: ResponseItem[]) => void;

    // this is the most rescent reply from the model
    // useed to auto scroll to bottom of the page
    latestResponse: string;
    setLatestResponse: (latestResponse: string) => void;

    //  this is the whole session data
    sessionList: SessionItem[]
    setSessionList: (s: SessionItem[]) => void

    // //  this is the current session selected
    latestSession: string 
    setLatestSession: (session: string) => void

    currentPlayingAudio: string
    setCurrentPlayingAudio: (currentPlayingAudio: string) => void
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
    const [latestSession, setLatestSession] = useState('')
    const [currentPlayingAudio, setCurrentPlayingAudio] = useState('susie sings')

    return (
        <DataContext.Provider
            value={{
                responses,
                latestResponse,
                sessionList,
                latestSession,
                currentPlayingAudio,
                setResponses,
                setLatestResponse,
                setSessionList,
                setLatestSession,
                setCurrentPlayingAudio
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
