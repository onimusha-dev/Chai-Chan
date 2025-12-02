import api from "@/api/api"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import { useUserContext } from "@/context/UserContext"
import { useDataContext } from "@/context/DataContext"
import { useUiContext } from "@/context/UiContext"
import { SquarePen } from "lucide-react"
import { Navigate, NavLink, useLocation } from "react-router-dom"


export const StartNewChatBar = () => {
    const { responses, setResponses, setLatestSession } = useDataContext()
    const { userData } = useUserContext()
    const { setIsTemporary } = useUiContext()
    const location = useLocation().pathname

    if (userData === null) {
        return <Navigate to={'/'} replace />
    }

    const clickHandler = async (userId: string) => {
        if (responses.length === 0) {
            setIsTemporary(false)
            return
        }

        const res = await api.post(`/session/${userId}`, { name: 'i love susie.' })

        if (!res) throw new Error('error crreating new chat.')

        setLatestSession(res.data.data.sessionId)
        setResponses([])
        setIsTemporary(false)
    }
    return (
        <SidebarMenuButton asChild
            onClick={() => clickHandler(userData?.userId)}
        >
            <NavLink draggable="false" to={location === '/' ? '#' : '/'}
                className={'py-5 focus-visible:bg-accent'}
            >
                < SquarePen />
                <span>New Chat</span>
            </NavLink>
        </SidebarMenuButton>
    )
}

export const StartNewChatToggle = () => {
    const { responses, setResponses, setLatestSession } = useDataContext()
    const { setIsTemporary } = useUiContext()
    const { userData } = useUserContext()
    const location = useLocation().pathname

    if (userData === null) {
        return <Navigate to={'/'} replace />
    }

    const clickHandler = async (userId: string) => {
        if (responses.length === 0) {
            setIsTemporary(false)
            return
        }

        const res = await api.post(`/session/${userId}`, { name: 'i love susie.' })
        if (!res) throw new Error('error crreating new chat.')

        setIsTemporary(false)
        setLatestSession(res.data.data.sessionId)
        setResponses([])
    }
    return (
        <SidebarMenuButton asChild
            onClick={() => clickHandler(userData?.userId)}
            className="w-fit"
        >
            <NavLink draggable="false" to={location === '/' ? '#' : '/'}
            >
                < SquarePen size={22} />
            </NavLink>
        </SidebarMenuButton>
    )
}