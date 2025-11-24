import StartNewChat from '@/features/ChatView/StartNewChat'
import {
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '../ui/sidebar'
import { NavLink } from 'react-router-dom'
import { Folder, Settings } from 'lucide-react';

const projects = [
    { name: "Projects", url: "#", icon: Folder },
    { name: "Settings", url: "settings", icon: Settings }
];


const AppSidebarHeader = () => {

    return (

        <SidebarHeader>
            <SidebarGroup>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <StartNewChat />
                    </SidebarMenuItem>
                    {projects.map((project, id) => (
                        <SidebarMenuItem key={id}>
                            <SidebarMenuButton asChild>
                                <NavLink
                                    draggable="false"
                                    className={'py-5 cursor-pointer'}
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