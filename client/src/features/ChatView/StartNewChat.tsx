import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { useResponseContext } from "@/context/ResponsContext"
import { SquarePen } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"


const StartNewChat = () => {
    const { responses, setResponses } = useResponseContext()

    const location = useLocation().pathname
    console.log(location)
    const clickHandler = () => {

        /**
         *  if on the same page and chat is empty
         *  it will not do anything if not then rerender the whole as it should be
         */
        if (responses.length === 0) return
        else { setResponses([]) }
    }
    return (
        <SidebarMenuItem onClick={clickHandler}>
            <SidebarMenuButton asChild>
                <NavLink to={location === '/' ? '#' : '/'}>
                    < SquarePen />
                    <span>New Chat</span>
                </NavLink>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}

export default StartNewChat