import { useResponseContext } from "@/context/ResponsContext"
import AiResponseBox from "./AiResponseBox";
import CopyChatText from "../../components/CopyChatText";
import { Card, CardContent } from "../../components/ui/card";
import { Brain } from "lucide-react";
import UserPromptBox from "./UserPromptBox";

const ChatView = () => {
    const { responses, isThinking } = useResponseContext()
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
                        <UserPromptBox prompt={item.prompt} />
                        <CopyChatText text={item.prompt} mode="user" />
                    </div>
                    <div className="relative flex w-full mb-15">
                        <AiResponseBox response={item.response} />
                        <CopyChatText text={item.prompt} mode="ai" />
                    </div>
                </div>
            ))}
            
            {/* thinking motion */}
            {
                isThinking && (
                    <div className="w-full rounded shadow "
                    >
                        <div className="relative flex w-full mb-15">
                            <IsThinkingNotifier />
                        </div>
                    </div>
                )
            }
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

const IsThinkingNotifier = () => {
    return (
        <div>
            <Card className="py-3">
                <CardContent className="tx-3">
                    <div className="flex items-center justify-center gap-5">
                        <Brain size={24} />
                        <p className="thinking-text">Thinking...</p>
                    </div>
                </CardContent>
            </Card>
        </div>

    )
}

export default ChatView
