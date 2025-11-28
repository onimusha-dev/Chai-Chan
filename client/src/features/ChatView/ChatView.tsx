import { useUiContext } from '@/context/UiContext';
import AiResponseBox from './AiResponseBox';
import CopyChatText from './ResponseOptions/ResponseOptions';
import { Card, CardContent } from '../../components/ui/card';
import { Brain } from 'lucide-react';
import UserPromptBox from './UserPromptBox';
import { useDataContext } from '@/context/DataContext';

const ChatView = () => {
    const { isThinking } = useUiContext();
    const { responses } = useDataContext()
    // console.log(responses)
    return (
        <div className="flex flex-col overflow-y-auto w-full h-full px-24 ">
            {responses.length === 0 && <EmptyChatPreview />}

            {responses.map((item, index) => (
                <div key={index} className="w-full">
                    <div className="relative flex justify-end w-full mb-15">
                        <UserPromptBox prompt={item.prompt} />
                        <CopyChatText text={item.prompt} mode="user" meta={item.meta}/>
                    </div>
                    <div id={item.id} className="relative flex w-full mb-15">
                        <AiResponseBox
                            reasoning={item.reasoning}
                            response={item.response}
                            timeTaken={item.timeTaken}
                        />
                        <CopyChatText text={item.response} mode="ai" meta={item.meta}/>
                    </div>
                </div>
            ))}

            {/* thinking motion */}
            {isThinking && (
                <div className="w-full rounded shadow ">
                    <div className="relative flex w-full mb-15">
                        <IsThinkingNotifier />
                    </div>
                </div>
            )}
        </div>
    );
};

const EmptyChatPreview = () => {
    const { isTemporary, isThinking } = useUiContext();
    return (
        <div className="h-full w-full flex">
            <div className="w-full h-full flex items-center justify-center select-none">
                {isTemporary ? (
                    <div className="flex flex-col items-center gap-3">
                        <h1 className="text-[28px] leading-[34px] font-normal tracking-[0.38px]">
                            Temporary Chat
                        </h1>
                        <p className="opacity-50 text-token-text-secondary max-w-[24rem] text-center text-base leading-6 font-normal tracking-[-0.32px] text-balance">
                            This chat won't appear in history, use or update
                            SastaGPT's memory, or be used to train our models.
                            For safety purposes, we may keep a copy of this chat
                            for up to 0 days.
                        </p>
                    </div>
                ) : !isThinking && (
                    <img
                        className="size-40"
                        src="https://res.cloudinary.com/dltj8bim0/image/upload/v1761060580/logo_kukwt0.png"
                        alt=""
                        draggable={'false'}
                    />
                )}
            </div>
        </div>
    );
};

/**
 * this is the processing animetion
 * need to improve this
 */
const IsThinkingNotifier = () => {
    return (
        <div>
            <Card className="py-3 shadow-none border-none bg-transparent">
                <CardContent className="tx-3">
                    <div className="flex items-center justify-center gap-5">
                        <Brain size={24} />
                        <p className="thinking-text">Thinking...</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ChatView;
