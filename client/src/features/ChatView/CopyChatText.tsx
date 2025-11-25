import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Copy } from "lucide-react"
const CopyChatText = ({ text, mode }: { text: string, mode: "ai" | "user" }) => {

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (error) {
            console.error('Unable to copy text to clipboard: ', error);
        }
    };

    return (<>
        <div className={`${mode === "ai" ? '' : 'justify-end'}
            absolute -bottom-10 left-0 flex w-full px-3`}
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
        </div>
    </>
    )
}

export default CopyChatText