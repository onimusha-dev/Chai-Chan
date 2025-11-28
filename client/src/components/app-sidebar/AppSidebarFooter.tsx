import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { ChevronUp, LogOut, Send, Settings, User2 } from 'lucide-react';
import api from '@/api/api';
import { Navigate } from 'react-router-dom';

const AppSidebarFooter = () => {
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
                                onClick={() => console.log('settings')}
                                className='mt-1'
                            >
                                <Settings />
                                <span className='text-lg w-44'>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => console.log('settings')}
                                className='mt-1'
                            >
                                <Send />
                                <span className='text-lg w-44'>Contact Us</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={handleLogout}
                                className='mt-1'
                            >
                                <LogOut />
                                <span className='text-lg w-44'>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    )
}

export default AppSidebarFooter