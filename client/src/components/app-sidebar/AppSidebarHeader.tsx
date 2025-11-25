import { StartNewChatBar } from '@/features/ChatView/StartNewChat'
import {
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from '../ui/sidebar'
import { NavLink } from 'react-router-dom'
import { Cat, Folder, Settings } from 'lucide-react';

const projects = [
    { name: "Projects", url: "#", icon: Folder },
    { name: "Settings", url: "settings", icon: Settings }
];


const AppSidebarHeader = () => {

    return (

        <SidebarHeader>
            <div className='flex flex-row justify-between p-2'>
                <NavLink
                    draggable='false'
                    to={'/'}>
                    <div className="flex items-center justify-center">
                        <Cat size={28} className='text-blue-600' />
                        <h1 className='h-full items-center flex font-bold text-blue-600 text-2xl ml-3 text-blue'>Sasta GPT</h1>
                    </div>
                </NavLink>
                <SidebarTrigger />
            </div>
            <SidebarGroup>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <StartNewChatBar />
                    </SidebarMenuItem>
                    {projects.map((project, id) => (
                        <SidebarMenuItem key={id}>
                            <SidebarMenuButton asChild>
                                <NavLink
                                    draggable="false"
                                    className={'py-5 cursor-pointer focus-visible:bg-accent'}
                                    to={project.url}>
                                    <project.icon />
                                    <span>{project.name}</span>
                                </NavLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroup>
        </SidebarHeader>
    )
}

export default AppSidebarHeader