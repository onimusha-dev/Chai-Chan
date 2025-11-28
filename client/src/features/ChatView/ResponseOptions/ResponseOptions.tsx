import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useUiContext } from "@/context/UiContext";
import { CheckCheck, Copy, Pause, Play } from "lucide-react"
import { useState } from "react";
import ResponseDetails from "./ResponseDetails";
import type { PopoverStats } from "@/types/response";


const CopyChatText = ({ text, mode, meta }: { text: string, mode: "ai" | "user", meta: PopoverStats }) => {

    const copyToClipboard = async () => {
        try {
            setCopied(true)
            await navigator.clipboard.writeText(text);
            setTimeout(() => {
                setCopied(false)
            }, 5000);
        } catch (error) {
            console.error('Unable to copy text to clipboard: ', error);
        }
    };

    const { setIsAudioPlaying } = useUiContext()
    const [isPlaying, setIsPlaying] = useState(false)
    const [copied, setCopied] = useState(false)

    // const handleCopyEmoj

    const handlePlayAndPause = () => {
        setIsPlaying(!isPlaying)
        setIsAudioPlaying(isPlaying)
        console.log('isplaying:   ' + isPlaying)
    }

    return (<>
        <div className={`${mode === "ai" ? '' : 'justify-end'}
            absolute -bottom-10 left-0 flex w-full px-3 gap-1`}
        >
            <Tooltip delayDuration={150}>
                <TooltipTrigger asChild>
                    <button className={`flex cursor-pointer items-center justify-center size-8 z-50 rounded-lg opacity-30 hover:bg-accent hover:opacity-100 transition-all duration-150 ease-in-out`}
                        onClick={copyToClipboard}
                    >
                        {
                            copied ? <CheckCheck size={20} /> : <Copy className="rotate-90" size={16} />
                        }
                    </button>
                </TooltipTrigger>
                <TooltipContent className="px-3">
                    <p className="text-xs select-none">{copied ? 'copied' : 'copy'}</p>
                </TooltipContent>
            </Tooltip>

            {/*  this is the audio play button */}
            {
                mode === 'ai' &&
                <Tooltip delayDuration={150}>
                    <TooltipTrigger asChild>
                        <button className={`flex cursor-pointer items-center justify-center size-8 z-50 rounded-lg opacity-30 hover:bg-accent hover:opacity-100 transition-all duration-150 ease-in-out`}
                            onClick={handlePlayAndPause}>
                            {
                                isPlaying ? <Pause size={16} /> : <Play size={16} />
                            }
                        </button>
                    </TooltipTrigger>
                    <TooltipContent className="px-3">
                        <p className="text-xs select-none">{isPlaying ? 'Pause' : 'Play'}</p>
                    </TooltipContent>
                </Tooltip>
            }

            {/*  this is the tokens details and all */}
            {
                mode === 'ai' &&
                <Tooltip delayDuration={150}>
                    <TooltipTrigger asChild>
                        <div>
                            <ResponseDetails meta={meta} />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent className="px-3">
                        <p className="text-xs select-none">info</p>
                    </TooltipContent>
                </Tooltip>
            }
        </div>
    </>
    )
}

export default CopyChatText