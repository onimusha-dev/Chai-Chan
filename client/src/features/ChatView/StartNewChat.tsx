import api from "@/api/api"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import { useDataContext } from "@/context/DataContext"
import { SquarePen } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"


const StartNewChat = () => {
    const { responses, setResponses, setLatestSession } = useDataContext()
    const userId = '69244fbc79b4f9eeece3d5b0'
    const location = useLocation().pathname

    const clickHandler = async (userId: string) => {
        if (responses.length === 0) return

        const res = await api.post(`/session/${userId}`, { name: 'i love susie.' })

        if (!res) throw new Error('error crreating new chat.')

        setLatestSession(res.data.data)
        setResponses([])

    }
    return (
        <SidebarMenuButton asChild
            onClick={() => clickHandler(userId)}
        >
            <NavLink draggable="false" to={location === '/' ? '#' : '/'}
                className={'py-5'}
            >
                < SquarePen />
                <span>New Chat</span>
            </NavLink>
        </SidebarMenuButton>
    )
}

export default StartNewChat