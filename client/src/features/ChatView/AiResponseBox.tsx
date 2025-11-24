import { Card, CardContent } from '../../components/ui/card';
import { marked } from 'marked';
import { Brain, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const AiResponseBox = ({
    response,
    reasoning,
    timeTaken,
}: {
    response: string;
    reasoning: string;
    timeTaken: number;
}) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const timeTakenInSeconds = timeTaken / 1_000_000_000;
    console.log(reasoning);
    const handleExpanded = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <div>
            <Card className="py-3 bg-background border-none shadow-none outline-none ">
                <CardContent className="tx-3">
                    {reasoning && (
                        <div
                            className={`${isExpanded && 'mb-5'} flex flex-col mt-10`}
                        >
                            <div
                                onClick={handleExpanded}
                                className="absolute w-full top-0 left-5 flex cursor-pointer py-1 my-3"
                            >
                                <div className="size-8 text-violet-500 flex justify-center items-center">
                                    <Brain size={18} />
                                </div>
                                <p
                                    className={`text-foreground select-none thinking-text-dark dark:thinking-text-light justify-center items-center flex`}
                                >
                                    Thought for {timeTakenInSeconds.toFixed(2)}{' '}
                                    seconds
                                </p>
                                <div
                                    className={`${!isExpanded && '-rotate-90'} size-8  flex justify-center items-center`}
                                >
                                    <ChevronDown size={18} />
                                </div>
                            </div>
                            {isExpanded && (
                                <div
                                    className={`x
                                        border-l-2 pl-3  opacity-50 prose prose-invert max-w-full wrap-break-word overflow-x-hidden prose-pre:overflow-x-auto prose-code:break-words`}
                                    dangerouslySetInnerHTML={{
                                        __html: marked(reasoning),
                                    }}
                                />
                            )}
                        </div>
                    )}
                    <div
                        className="prose-fluid prose-wrapper prose prose-invert max-w-full wrap-break-word overflow-x-hidden prose-pre:overflow-x-auto prose-code:break-words"
                        dangerouslySetInnerHTML={{ __html: marked(response) }}
                    />
                </CardContent>
            </Card>
        </div>
    );
};
export default AiResponseBox;
