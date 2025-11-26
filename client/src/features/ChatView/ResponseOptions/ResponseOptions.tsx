import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useUiContext } from "@/context/UiContext";
import { Copy, Pause, Play } from "lucide-react"
import { useState } from "react";


const CopyChatText = ({ text, mode }: { text: string, mode: "ai" | "user" }) => {

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (error) {
            console.error('Unable to copy text to clipboard: ', error);
        }
    };

    const { setIsAudioPlaying } = useUiContext()
    const [isPlaying, setIsPlaying] = useState(false)

    const handlePlayAndPause = () => {
        setIsPlaying(!isPlaying)
        setIsAudioPlaying(isPlaying)
        console.log('isplaying:   ' + isPlaying)
    }

    return (<>
        <div className={`${mode === "ai" ? '' : 'justify-end'}
            absolute -bottom-10 left-0 flex w-full px-3 gap-1`}
        >
            <Tooltip>
                <TooltipTrigger asChild>
                    <button className={`flex cursor-pointer items-center justify-center size-8 z-50 rounded-lg opacity-30 hover:bg-accent hover:opacity-100 transition-all duration-150 ease-in-out`}
                        onClick={copyToClipboard}
                    >
                        <Copy className="rotate-90" size={16} />
                    </button>
                </TooltipTrigger>
                <TooltipContent className="px-3">
                    <p className="text-xs select-none">copy</p>
                </TooltipContent>
            </Tooltip>

            {/*  this is the audio play button */}
            {
                mode === 'ai' &&
                <Tooltip>
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
        </div>
    </>
    )
}

export default CopyChatText