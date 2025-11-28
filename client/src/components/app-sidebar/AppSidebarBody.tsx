import { SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { useEffect, useRef, useState } from 'react';
import api from '@/api/api';
import { useDataContext, type SessionItem } from '@/context/DataContext';
import { ChevronDown } from 'lucide-react';
import { useUiContext } from '@/context/UiContext';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '@/context/AuthContext';
import { SessionNameComponent } from './components/SessionNameComponent';
import { SessionOptionsMenu } from './components/SessionOptionMenu';

const AppSidebarBody = () => {
    const { sessionList, latestSession, setSessionList, setLatestSession, setResponses } = useDataContext();
    const { userData } = useUserContext()
    const { setIsTemporary } = useUiContext()
    const [isSessionListOpen, setIsSessionListOpen] = useState(true)

    /**
     *  this is for loading the chat list on mount 
     */
    const fetchSessionList = async (userId: string | undefined) => {
        // setLoading(true)
        if (userId === undefined) {
            return console.error('authentication failed')
        }
        const res = await api.get(`session/${userId}`)
        setSessionList(res.data.data)
        console.log(res.data)
    }
    useEffect(() => {
        fetchSessionList(userData?.userId)
        // setLoading(false)
    }, [])


    /**
     * this is to navigate bw different chats
     */
    const navigator = useNavigate()
    const handleSessionChatLoad = async (sessionId: string) => {
        if (sessionId !== 'temporory-session') {
            setIsTemporary(false)
            setLatestSession(sessionId)
            if (sessionList[sessionList.length - 1].sessionId === 'temporory-session') {
                setSessionList((prev: SessionItem[]) => {
                    if (!Array.isArray(prev)) return [];
                    return prev.slice(0, -1);
                });
            }
            const res = await api.get(`/chat/${sessionId}`)
            if (!res) throw new Error(`error fetching chat session id ${sessionId} is not valid.`)

            setResponses(res.data.data)
            navigator('/')
            return;
        }
        else return;
    }
    const [isEditing, setIsEditing] = useState('')

    return (
        <SidebarContent className=''>
            <SidebarGroup>
                <SidebarGroupLabel className='text-sm opacity-75 px-0'
                >
                    <Button className='w-full justify-start bg-transparent text-foreground px-2 hover:bg-transparent'
                        onClick={() => setIsSessionListOpen(!isSessionListOpen)}>
                        <h1>Your Chats</h1>
                        <div className={`${!isSessionListOpen && '-rotate-90'} size-8 flex justify-center items-center`}
                        >
                            <ChevronDown size={20} />
                        </div>
                    </Button>
                </SidebarGroupLabel>

                {/*   Chat sessions   */}
                {isSessionListOpen &&
                    <SidebarMenu>
                        {sessionList?.map((s, index) => (
                            <SidebarMenuItem
                                key={index}>
                                <SidebarMenuButton role='button' tabIndex={0}
                                    className={`${s.sessionId === latestSession && 'bg-accent'}
                                cursor-pointer py-5 focus-visible:outline-2 focus:outline-none focus-visible:ring-2 focus-visible:bg-accent`}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            console.log(s.sessionId)
                                            handleSessionChatLoad(s.sessionId)
                                        }
                                    }}
                                    onClick={() => handleSessionChatLoad(s.sessionId)}
                                    asChild
                                >
                                    <div className="w-full group/chat">
                                        <SessionNameComponent name={s.name} sessionId={s.sessionId} isEditing={isEditing} setIsEditing={setIsEditing} />
                                        {/*  calling for option menu */}
                                        {
                                            (isEditing !== s.sessionId && s.sessionId !== 'temporory-session')
                                            && <SessionOptionsMenu sessionId={s.sessionId} setIsEditing={setIsEditing} />
                                        }
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                }
            </SidebarGroup>
        </SidebarContent>
    )
}

export default AppSidebarBody
