import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { useDataContext } from "@/context/DataContext"
import { SquarePen } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"


const StartNewChat = () => {
    const { responses, setResponses } = useDataContext()

    const location = useLocation().pathname

    const clickHandler = () => {

        /**
         *  if on the same page and chat is empty
         *  it will not do anything if not then rerender the whole as it should be
         */
        if (responses.length === 0) return
        else { setResponses([]) }
    }
    return (
        <SidebarMenuButton asChild
            onClick={clickHandler}
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