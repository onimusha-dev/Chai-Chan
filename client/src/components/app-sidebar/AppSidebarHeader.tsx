import { StartNewChatBar } from '@/features/ChatView/StartNewChat'
import {
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarTrigger,
} from '../ui/sidebar'
import { NavLink } from 'react-router-dom'
import { Cat } from 'lucide-react';

const AppSidebarHeader = () => {

    return (

        <SidebarHeader>
            <div className='flex flex-row justify-between p-2'>
                <NavLink
                    draggable='false'
                    to={'/'}>
                    <div className="flex items-center justify-center">
                        <Cat size={28} className='text-blue-600' />
                        <h1 className='h-full items-center flex font-bold text-blue-600 text-2xl ml-3 text-blue'>Chai AI</h1>
                    </div>
                </NavLink>
                <SidebarTrigger />
            </div>
            <SidebarGroup>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <StartNewChatBar />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
        </SidebarHeader>
    )
}

export default AppSidebarHeader