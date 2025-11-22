import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from './ui/sidebar';
import { Folder, Settings } from "lucide-react";
import { NavLink } from 'react-router-dom';
import StartNewChat from '@/features/ChatView/StartNewChat';

export const projects = [
    { name: "Projects", url: "#", icon: Folder },
    { name: "Settings", url: "settings", icon: Settings }
];

const AppSidebar = () => {
    return (
        <Sidebar>
            <SidebarContent> 
                <SidebarGroup>
                    <SidebarGroupLabel>Projects</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <StartNewChat />
                            {projects.map((project) => (
                                <SidebarMenuItem key={project.name}>
                                    <SidebarMenuButton asChild>
                                        <NavLink to={project.url}>
                                            <project.icon />
                                            <span>{project.name}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

export default AppSidebar;
