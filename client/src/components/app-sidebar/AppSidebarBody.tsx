import { SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { useEffect, useState } from 'react';
import api from '@/api/api';
import { useDataContext } from '@/context/DataContext';
import { ChevronDown, Ellipsis, } from 'lucide-react'; //Ellipsis
import { useUiContext } from '@/context/UiContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

const AppSidebarBody = () => {
    const { sessionList, setSessionList, setResponses } = useDataContext();
    const { setIsTemporary } = useUiContext()

    const [isSessionListOpen, setIsSessionListOpen] = useState(true)
    // const [loading, setLoading] = useState(false);

    const fetchSessionList = async (userId: string) => {
        const res = await api.get(`session/${userId}`)
        setSessionList(res.data.data)
    }

    useEffect(() => {
        const userId = false ? '69244fbc79b4f9eeece3d5b0' : '69240455d024275caf22cf3c'
        fetchSessionList(userId)
    }, [])

    const navigator = useNavigate()
    const handleSessionChatLoad = async (id: string) => {
        console.log(id)
        setIsTemporary(false)
        const res = await api.get(`/chat/${id}`)

        if (!res) throw new Error(`error fetching chat session id ${id} is not valid.`)
        navigator('/')
        setResponses(res.data.data)
        console.log('data loaded,')
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
                        {sessionList?.map((s, id) => (
                            <SidebarMenuItem
                                key={id}>
                                <SidebarMenuButton role='button' tabIndex={0} className='cursor-pointer py-5 focus-visible:outline-2 focus:outline-none focus-visible:ring-2 focus-visible:bg-accent'
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            handleSessionChatLoad(s.id)
                                        }
                                    }}
                                    onClick={() => handleSessionChatLoad(s.id)}
                                    asChild
                                >
                                    <div className="w-full group/chat">
                                        <span className="py-4 w-full text-nowrap overflow-hidden mask-[linear-gradient(to_right,black_75%,transparent_100%)]"
                                        >
                                            {s.name}
                                        </span>

                                        {/*  calling for option menu */}
                                        <SessionOptionsMenu id={s.id} />
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

const SessionOptionsMenu = (id: { id: string }) => {

    const handleEditSessionName = () => {
        console.log(id + "   edit")
    }

    const handleDeleteSessionName = () => {
        console.log(id + "   delete")
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
