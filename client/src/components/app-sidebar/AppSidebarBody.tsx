import { SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { useEffect } from 'react';
import api from '@/api/api';
import { useDataContext } from '@/context/DataContext';

const AppSidebarBody = () => {

    const { sessionList, setSessionList, setResponses } = useDataContext();
    // const [loading, setLoading] = useState(false);

    const fetchSessionList = async (userId: string) => {
        const res = await api.get(`session/${userId}`)
        setSessionList(res.data.data)
        console.log(res.data.data)

    }

    useEffect(() => {
        const userId = '69240455d024275caf22cf3c'
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
                <h1 className="w-full px-5 py-3 text-sm opacity-75">Your Chats</h1>
                <SidebarMenu>
                    {sessionList?.map((s, id) => (
                        <SidebarMenuItem
                            onClick={() => handleChatLoad(s.id)}
                            className='px-3' key={id}>
                            <SidebarMenuButton className='bg-red-500'
                            asChild>
                                <h1 className="py-4 text-nowrap">{s.name}</h1>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroup>

        </SidebarContent>
    )
}
export default AppSidebarBody