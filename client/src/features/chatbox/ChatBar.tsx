import { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import api from '@/api/api';
import { useUiContext } from '@/context/UiContext';
import { useDataContext } from "@/context/DataContext"
import SchorllToNewChat from './components/SchorllToNewChat';
import { useUserContext } from '@/context/AuthContext';
import ChatBoxTools from './components/ChatBoxTools';
import { MoveUp, Square } from 'lucide-react';

const ChatBar = () => {
    const [prompt, setPrompt] = useState('');
    const { model, isReasoning, isTemporary, setIsThinking, isThinking } = useUiContext();

    const { responses, sessionList, latestSession, setLatestSession, setSessionList, setLatestResponse, setResponses } = useDataContext()
    const { userData } = useUserContext()

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
                    meta: res2.data.data.meta
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
                    meta: res.data.data.meta
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
                const newObject = {
                    id: res.data.data.id,
                    prompt: prompt,
                    response: res.data.data.response,
                    reasoning: res.data.data.reasoning,
                    timeTaken: res.data.data.timeTaken,
                    meta: res.data.data.meta
                };
                const newResponses = [...responses, newObject];

                setLatestSession(latestSession);  //  this is the error
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
        <div className="flex flex-col w-full px-5 pt-1 bg-background ">
            <Card className="w-full rounded-3xl pt-0">
                <CardContent>
                    <textarea
                        className="w-full h-auto outline-0 my-3 resize-none"
                        placeholder="What's on your mind?"
                        value={prompt}
                        onChange={e => setPrompt(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && sendPrompt()}
                    />

                    {/*  this is the options menu in the chat bar  */}
                    <div className="flex justify-between gap-3">
                        <ChatBoxTools />
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
            <div className="w-full h-10 flex items-center justify-center select-none">
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
