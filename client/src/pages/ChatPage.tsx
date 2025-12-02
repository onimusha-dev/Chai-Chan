import ChatBar from "@/features/chatbox/ChatBar"
import ChatView from "@/features/ChatView/ChatView"

const ChatPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full pt-20">

            {/*  this is the main div content */}
            <div className="flex flex-col items-center h-full w-full ">

                {/* here the data from llm will be shown */}
                <ChatView />
                {/* chat bar */}
                <ChatBar />
            </div>

        </div>
    )
}

export default ChatPage