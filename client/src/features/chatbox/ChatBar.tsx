import { useState } from 'react';
import { Brain, MoveUp, Square } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import api from '@/api/api';
import { useUiContext } from '@/context/UiContext';
import { useDataContext } from "@/context/DataContext"
import ModelToggle from './ModelToggle';
import SchorllToNewChat from './SchorllToNewChat';
import { useUserContext } from '@/context/AuthContext';

const ChatBar = () => {
    const [prompt, setPrompt] = useState('');
    const {
        model,
        isReasoning,
        isTemporary,
        setIsThinking,
        setIsReasoning,
    } = useUiContext();

    const { responses, sessionList, latestSession, setLatestSession, setSessionList, setLatestResponse, setResponses } = useDataContext()
    const { userData } = useUserContext()
    const { isThinking } = useUiContext()

    const sendPrompt = async () => {
        if (!prompt.trim()) return;
        const collection = 'Collection 1';

        try {
            setIsThinking(true);

            /*
            * this is for the first prompt as latest session will be empty
            */
            if (!latestSession || latestSession === '') {
                const res = await api.post(`/session/${userData?.userId}`)

                if (!res) throw new Error(`error fetching chat session id ${userData?.userId} is not valid.`)
                setLatestSession(res.data.data.sessionId)
                setSessionList([...sessionList, res.data.data])

                const res2 = await api.post('chat', {
                    model,
                    prompt,
                    collection,
                    reasoning: isReasoning,
                    isTemporary,
                    sessionId: res.data.data.sessionId,
                });
                console.log(res2.data)
                const newObject = {
                    id: res2.data.data.id,
                    prompt: prompt,
                    response: res2.data.data.response,
                    reasoning: res2.data.data.reasoning,
                    timeTaken: res2.data.data.timeTaken,
                };
                const newResponses = [...responses, newObject];

                setResponses(newResponses);
                setLatestResponse(newObject.id);
                setSessionList([...sessionList, res.data.data])
                return;
            }

            /**
             * this is for temporary session this is made by frontend no backend enterveson is needed
             * no api call is done as well
             * and the latestSession or temparory latestSession is 
             * set to exactly  'temporory-session'   
             */
            else if (latestSession === 'temporory-session') {

                const res = await api.post('chat', {
                    model,
                    prompt,
                    collection,
                    reasoning: isReasoning,
                    isTemporary: true,
                    sessionId: latestSession,
                });
                const newObject = {
                    id: res.data.data.id,
                    prompt: prompt,
                    response: res.data.data.response,
                    reasoning: res.data.data.reasoning,
                    timeTaken: res.data.data.timeTaken,
                };
                const newResponses = [...responses, newObject];

                setResponses(newResponses);
                setLatestResponse(newObject.id);
                return;
            }

            // /**
            //  * this is for any prompt after first session is set
            //  */
            else {
                const res = await api.post('chat', {
                    model,
                    prompt,
                    collection,
                    reasoning: isReasoning,
                    isTemporary,
                    sessionId: latestSession,
                });
                console.log(res.data)
                const newObject = {
                    id: res.data.data.id,
                    prompt: prompt,
                    response: res.data.data.response,
                    reasoning: res.data.data.reasoning,
                    timeTaken: res.data.data.timeTaken,
                };

                const newResponses = [...responses, newObject];

                setLatestSession(latestSession);  //  this is the error
                // setLatestResponse('')
                setResponses(newResponses);
                setLatestResponse(newObject.id);
                return;
            }
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setPrompt('');
            setIsThinking(false);
        }
    }

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
                        {
                            (
                                model === 'qwen3-vl:2b' ||
                                model === 'qwen3:0.6b'  ||
                                model === 'qwen3:1.7b'
                            ) && (
                                <button
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
                                </button>
                            )
                        }
                        <button
                            onClick={sendPrompt}
                            className={`${isThinking ? 'opacity-50' : ''}
                            ${prompt.trim() === '' && 'opacity-25'} bg-white text-background
                            cursor-pointer flex size-10 items-center justify-center p-1 rounded-full  transition-colors duration-150 ease-in-out`}
                        >
                            {
                                isThinking ? <Square size={20} /> : <MoveUp size={22} />
                            }
                        </button>
                    </div>
                </CardContent>
            </Card>

            {/*  */}
            <div className="absolute bottom-0 left-0 w-full h-10 flex items-center justify-center select-none">
                <h1 className="text-sm h-5">
                    SastaAI can make mistakes. Check important info. See &nbsp;
                    <button className="w-fit underline cursor-pointer h-5">
                        Cookie Preferences
                    </button>.
                </h1>
            </div>

            {/* schroll to new chat */}
            <SchorllToNewChat />
        </div>
    );
};

export default ChatBar;
