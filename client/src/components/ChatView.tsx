import { useResponseContext } from "@/context/ResponsContext"
import UserPrompt from "./UserPromptBox";
import AiResponseBox from "./AiResponseBox";
import CopyChatText from "./CopyChatText";

const ChatView = () => {
    const { responses } = useResponseContext()
    console.log("newObject =", responses);

    return (
        <div className="flex flex-col overflow-y-auto w-full h-full px-24 mb-32">
            {responses.length === 0 && (
                <EmptyChatPreview />
            )}

            {responses.map(item => (
                <div
                    key={item.id}
                    className="w-full rounded shadow "
                >
                    <div className="relative flex justify-end w-full mb-15">
                        <UserPrompt prompt={item.prompt} />
                        <CopyChatText text={item.prompt} mode="user" />
                    </div>
                    <div className="relative flex w-full">
                        <AiResponseBox response={item.response} />
                        <CopyChatText text={item.prompt} mode="ai" />
                    </div>
                </div>
            ))}
        </div>
    )
}

const EmptyChatPreview = () => {
    return (
        <div className="flex flex-col w-full h-full items-center justify-center select-none">
            <p className="opacity-50 p-4">No chats yet...</p>
        </div>
    )
}

export default ChatView
