import { SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { useEffect, useState } from 'react';
import api from '@/api/api';
import { useDataContext } from '@/context/DataContext';
import { ChevronDown, } from 'lucide-react'; //Ellipsis

const AppSidebarBody = () => {

    const [isSessionListOpen, setIsSessionListOpen] = useState(true)

    const { sessionList, setSessionList, setResponses } = useDataContext();
    // const [loading, setLoading] = useState(false);

    const fetchSessionList = async (userId: string) => {
        const res = await api.get(`session/${userId}`)
        setSessionList(res.data.data)
        console.log(res.data.data)

    }

    useEffect(() => {
        const userId = false ? '69244fbc79b4f9eeece3d5b0' : '69240455d024275caf22cf3c'
        fetchSessionList(userId)
    }, [])

    const handleChatLoad = async (id: string) => {
        console.log(id)
        const res = await api.get(`/chat/${id}`)

        if (!res) throw new Error(`error fetching chat session id ${id} is not valid.`)

        setResponses(res.data.data)
        console.log('data loaded,')
    }

    return (
        <SidebarContent className=''>
            <SidebarGroup>
                <SidebarGroupLabel
                    onClick={() => setIsSessionListOpen(!isSessionListOpen)}
                    className='text-sm opacity-75'
                >
                    <h1>Your Chats</h1>
                    <div
                        className={`${!isSessionListOpen && '-rotate-90'} size-8 flex justify-center items-center`}
                    >
                        <ChevronDown size={20} />
                    </div>
                </SidebarGroupLabel>

                {isSessionListOpen &&
                    <SidebarMenu>
                        {sessionList?.map((s, id) => (
                            <SidebarMenuItem
                                onClick={() => handleChatLoad(s.id)}
                                className='' key={id}>
                                <SidebarMenuButton className='cursor-pointer py-5'
                                    asChild>
                                    <h1 className="py-4 text-nowrap">{s.name}</h1>
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


// < div className = "absolute top-0 hover:bg-accent left-0 flex w-full h-full items-center justify-end  " >
//         <h1 className="relative py-4 text-nowrap">{"name"}</h1>
//         <div className="size-7 flex items-center justify-center rounded-full hover:bg-white/10"
//             onClick={(e) => e.stopPropagation()}
//         >
//             <Ellipsis size={16} />
//         </div>
//     </div >