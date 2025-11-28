import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { ChevronUp, LogOut, Send, Settings, User2 } from 'lucide-react';
import api from '@/api/api';
import { Navigate, useNavigate } from 'react-router-dom';

const AppSidebarFooter = () => {
    const navigate = useNavigate()
    const handleLogout = async () => {
        const res = await api.post('/auth/logout')
        if (!res) throw Error('error logging out')

        return <Navigate to={'/auth'} replace />
    }

    return (
        <SidebarFooter className='pb-3'>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild
                            className='h-11 bg-accent rounded-2xl'
                        >
                            <SidebarMenuButton>
                                <User2 /> Username
                                <ChevronUp className="ml-auto" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            side="top"
                            className="w-[--radix-popper-anchor-width] bg-accent/80 rounded-2xl mb-3"
                        >
                            <DropdownMenuItem
                                onClick={() => navigate('/settings')}
                                className="mt-1 px-3 rounded-t-xl"
                            >
                                <Settings size={28} />
                                <span className="text-lg w-44">Settings</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => window.alert("Contact us feature coming soon!")}
                                className="mt-1 px-3"
                            >
                                <Send size={28} />
                                <span className="text-lg w-44">Contact Us</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={handleLogout}
                                className="mt-1 px-3 rounded-b-xl hover:bg-destructive/15 focus:bg-destructive/15"
                            >
                                <LogOut size={28} className='text-destructive' />
                                <span className="text-lg w-44 text-destructive">Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    )
}

export default AppSidebarFooter