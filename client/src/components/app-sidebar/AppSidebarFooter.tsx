import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { ChevronUp, LogOut, Send, Settings, User2 } from 'lucide-react';
import api from '@/api/api';
import { useUserContext } from '@/context/UserContext';
import { useUiContext } from '@/context/UiContext';
import { Navigate } from 'react-router-dom';

const AppSidebarFooter = () => {
    const {userData} = useUserContext()
const { setIsSettingsPopupOpen } = useUiContext();
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
                                <div className="pl-1 rounded-full">
                                    {userData?.avatarUrl ? (
                                        <img
                                            src={userData.avatarUrl}
                                            alt="User Avatar"
                                            className="h-8 w-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <User2 className="h-8 w-8 p-1 text-muted-foreground" />
                                    )}
                                </div> 
                                <p className="text-sm">{userData?.username}</p>
                                <ChevronUp className="ml-auto" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            side="top"
                            className="w-[--radix-popper-anchor-width] bg-accent/80 rounded-2xl mb-3"
                        >
                            <DropdownMenuItem
                                onClick={() => setIsSettingsPopupOpen(true)}
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