import api from '@/api/api';
import { Ellipsis, PencilLine, Trash2, } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenuAction } from '@/components/ui/sidebar';
import { useDataContext } from '@/context/DataContext';


export const SessionOptionsMenu = ({ sessionId, setIsEditing }: { sessionId: string, setIsEditing: (isEditing: string) => void }) => {
    const { sessionList, setSessionList } = useDataContext()
    const handleUpdateSession = () => {
        setIsEditing(sessionId)
    }
    const handleDeleteSession = async () => {
        if (sessionId === 'temporory-session') return

        const res = api.delete(`/session/${sessionId}`)
        if (!res) throw Error('session delete failed')

        const updatedSessionList = sessionList.filter(
            session => {
                return session.sessionId !== sessionId
            }
        )
        setSessionList(updatedSessionList)
        return
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuAction
                    className="size-7 flex items-center justify-center rounded-full opacity-0 group-hover/chat:opacity-30 hover:opacity-100 focus-visible:opacity-75 focus-visible:hover:bg-white/10 focus-visible:bg-white/10 hover:bg-white/10"
                >
                    <Ellipsis size={16} />
                </SidebarMenuAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent onClick={(e) => e.stopPropagation()} side="right" align="start" className='space-y-1'>
                <DropdownMenuItem
                    onClick={handleUpdateSession}
                >
                    <PencilLine size={22} />
                    <span>Rename</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={handleDeleteSession}
                >
                    <Trash2 size={22} className='text-destructive' />
                    <span className='text-destructive'>Delete</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
