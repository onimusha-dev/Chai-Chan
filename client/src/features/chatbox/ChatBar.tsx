import { useState } from 'react';
import { Brain, Send } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import api from '@/api/api';
import { useUiContext } from '@/context/UiContext';
import { useDataContext } from "@/context/DataContext"
import ModelToggle from './ModelToggle';
import SchorllToNewChat from './SchorllToNewChat';

const ChatBar = () => {
    const [prompt, setPrompt] = useState('');
    const {
        model,
        isReasoning,
        isTemporary,
        setIsThinking,
        setIsReasoning,
    } = useUiContext();

    const { responses, latestSession, setLatestSession, setLatestResponse, setResponses } = useDataContext()

    const sendPrompt = async () => {
        if (!prompt.trim()) return;
        const userId = '69244fbc79b4f9eeece3d5b0'
        const collection = 'Collection 1';
        const latestSession = '69240c4cc3883a0eb6e3edcf'

        try {
            setIsThinking(true);

            // if (!latestSession || latestSession === '') {
            //     const res = await api.post(`/session/${userId}`)

            //     if (!res) throw new Error(`error fetching chat session id ${userId} is not valid.`)

            //     setResponses(res.data.data)
            //     setLatestSession(res.data.data.id)
            //     console.log('data loaded, ' + latestSession)
            // }

            const res = await api.post('chat', {
                model,
                prompt,
                collection,
                reasoning: isReasoning,
                isTemporary,
                sessionId: latestSession,
            });
            console.log(res.data);
            const newObject = {
                id: res.data.response.id,
                prompt: prompt,
                response: res.data.response.response,
                reasoning: res.data.response.reasoning,
                timeTaken: res.data.response.timeTaken,
            };

            const newResponses = [...responses, newObject];

            setResponses(newResponses);
            setLatestResponse(newObject.id);
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setPrompt('');
            setIsThinking(false);
        }
    };

    return (
        <div className="flex flex-col absolute left-0 bottom-0 w-full z-70 px-5 pb-15 pt-1 bg-background ">
            <Card className="w-full rounded-full py-2">
                <CardContent className="flex gap-3 px-3">
                    <div className="cursor-pointer flex size-10 items-center justify-center p-1 rounded-full hover:bg-accent transition-colors duration-150 ease-in-out">
                        <ModelToggle />
                    </div>

                    <input
                        type="text"
                        className="w-full outline-0"
                        placeholder="What's on your mind?"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendPrompt()}
                    />

                    <div className="flex ml-5 gap-3">
                        {/*  this is the btn for enabling thinking mode only available for specific models */}
                        {(model === 'qwen3-vl:2b' ||
                            model === 'qwen3:0.6b') && (
                                <div
                                    className={`${isReasoning ? 'px-4 py-1 border border-violet-500/50 bg-violet-950/50 ' : 'size-10 p-1 hover:bg-accent '}
                            cursor-pointer flex items-center justify-center text-violet-500 rounded-full transition-colors duration-150 ease-in-out`}
                                    onClick={() => setIsReasoning(!isReasoning)}
                                >
                                    <div className="flex ">
                                        <Brain size={22} />
                                        {isReasoning && (
                                            <p className="text-sm ml-1 thinking-text-violet-dark">
                                                Thinking
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                        <div
                            onClick={sendPrompt}
                            className="cursor-pointer flex size-10 items-center justify-center p-1 rounded-full hover:bg-white hover:text-black transition-colors duration-150 ease-in-out"
                        >
                            <Send size={22} />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/*  */}
            <div className="absolute bottom-0 left-0 w-full h-10 flex items-center justify-center select-none">
                <h1 className="text-sm h-5">
                    SastaAI can make mistakes. Check important info. See &nbsp;
                    <button className="w-fit underline cursor-pointer h-5">
                        Cookie Preferences
                    </button>
                    .
                </h1>
            </div>

            {/* schroll to new chat */}
            <SchorllToNewChat />
        </div>
    );
};

export default ChatBar;
