import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { ChevronUp, User2 } from 'lucide-react';
import { Card } from '../ui/card';

const AppSidebarFooter = () => {
    
    return (
        // <SidebarFooter>
        //     <button
        //         onClick={handleLoad}
        //     >
        //         load
        //     </button>
        // </SidebarFooter>

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
                            // className="w-[--radix-popper-anchor-width]"
                        >
                            <Card>

                            </Card>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    )
}

export default AppSidebarFooter