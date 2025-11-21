import ChatBar from "@/features/chatbox/ChatBar"
import ChatView from "@/features/ChatView/ChatView"
import { ModeToggle } from "@/components/theme/mode-toggle"
import { SidebarTrigger } from "@/components/ui/sidebar"

const ChatPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <header className="absolute top-0 left-0 px-2 py-2 flex w-full justify-between">
                <SidebarTrigger />
                <ModeToggle />
            </header>

            {/*  this is the main div content */}
            <div className="flex flex-col pt-15 items-center h-full w-full ">

                {/* here the data from llm will be shown */}
                <ChatView />
            </div>

            {/* chat bar */}
            <ChatBar />
        </div>
    )
}

export default ChatPage