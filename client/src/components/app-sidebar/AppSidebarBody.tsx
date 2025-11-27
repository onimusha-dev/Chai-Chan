import { SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { useEffect, useState } from 'react';
import api from '@/api/api';
import { useDataContext } from '@/context/DataContext';
import { ChevronDown, Ellipsis, } from 'lucide-react';
import { useUiContext } from '@/context/UiContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '@/context/AuthContext';

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
        setIsTemporary(false)
        setLatestSession(sessionId)
        console.log(sessionId)
        const res = await api.get(`/chat/${sessionId}`)
        if (!res) throw new Error(`error fetching chat session id ${sessionId} is not valid.`)
        console.log(res.data.data)
        setResponses(res.data.data)
        navigator('/')
    }

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
                                        <span className="py-4 w-full text-nowrap overflow-hidden mask-[linear-gradient(to_right,black_75%,transparent_100%)]"
                                        >
                                            {s.name}
                                        </span>

                                        {/*  calling for option menu */}
                                        <SessionOptionsMenu sessionId={s.sessionId} />
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

const SessionOptionsMenu = (sessionId: { sessionId: string }) => {

    const handleEditSessionName = () => {
        console.log(sessionId.sessionId + "   edit")
    }

    const handleDeleteSessionName = async () => {
        console.log(sessionId.sessionId + "   delete")
        const res = api.delete(`/session/${sessionId.sessionId }`)

        if (!res) throw Error('session delete failed')
        return
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuAction
                    className="size-7 flex items-center justify-center rounded-full opacity-0 group-hover/chat:opacity-30 hover:opacity-100 focus-visible:opacity-75 focus-visible:hover:bg-white/10 focus-visible:bg-white/10 hover:bg-white/10"
                >
                    <Ellipsis size={16} />
                </SidebarMenuAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent onClick={(e) => e.stopPropagation()} side="right" align="start">
                <DropdownMenuItem
                    onClick={handleEditSessionName}
                >
                    <span>Edit Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={handleDeleteSessionName}
                >
                    <span className='text-destructive'>Delete</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}



export default AppSidebarBody
