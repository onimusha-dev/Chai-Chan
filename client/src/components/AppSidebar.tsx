import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator
} from './ui/sidebar';
import { Folder, Settings } from "lucide-react";
import { NavLink } from 'react-router-dom';
import StartNewChat from '@/features/ChatView/StartNewChat';
import { useState } from 'react';
import api from '@/api/api';
import { useResponseContext } from '@/context/ResponsContext';

const projects = [
    { name: "Projects", url: "#", icon: Folder },
    { name: "Settings", url: "settings", icon: Settings }
];

const AppSidebar = () => {

    const { responses, setResponses } = useResponseContext();
    const [loading, setLoading] = useState(false);

    const getHistory = async () => {
        try {
            setLoading(true);
            const res = await api.get('chats/69240c77c3883a0eb6e3edd3');

            if (!res) throw Error("there was an error retreating history.");

            setResponses(res.data.chats)
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLoad = () => {

        console.log(responses)
    };


    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Projects</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <StartNewChat />
                            {projects.map((project, id) => (
                                <SidebarMenuItem key={id}>
                                    <SidebarMenuButton asChild>
                                        <NavLink to={project.url}>
                                            <project.icon />
                                            <span>{project.name}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                        <button
                            onClick={handleLoad}
                        >
                            load
                        </button>
                        <SidebarSeparator />
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className="p-3">
                    <button
                        onClick={getHistory}
                        className="text-sm text-foreground/80 hover:underline"
                    >
                        {loading ? "Loading..." : "Get history"}
                    </button>

                </div>
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;
