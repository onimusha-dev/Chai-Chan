import { useResponseContext } from "@/context/ResponsContext"
import AiResponseBox from "./AiResponseBox";
import CopyChatText from "./CopyChatText";
import { Card, CardContent } from "../../components/ui/card";
import { Brain } from "lucide-react";
import UserPromptBox from "./UserPromptBox";

const ChatView = () => {
    const { responses, isThinking } = useResponseContext()

    return (
        <div className="flex flex-col overflow-y-auto w-full h-full px-24 pt-15 pb-48 ">
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
                    <div id={item.id} className="relative flex w-full mb-15">
                        <AiResponseBox response={item.response} />
                        <CopyChatText text={item.response} mode="ai" />
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
            <div className="h-full w-full flex">
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center select-none">
                <img
                    className="size-40"
                    src="https://res.cloudinary.com/dltj8bim0/image/upload/v1761060580/logo_kukwt0.png"
                    alt=""
                    draggable={'false'}
                />
                </div>
            </div>
    )
}

const IsThinkingNotifier = () => {
    return (
        <div>
            <Card className="py-3 shadow-none">
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
