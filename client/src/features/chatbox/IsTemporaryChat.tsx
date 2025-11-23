import { useResponseContext } from '@/context/ResponsContext'
import { MessageCircle, MessageCircleDashed } from 'lucide-react'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const IsTemporaryChat = () => {
    const { isTemporary, setIsTemporary } = useResponseContext()

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div
                    className={`${isTemporary && "text-red-500"}
                                    cursor-pointer flex items-center hover:bg-accent size-10 justify-center p-1 rounded-full transition-colors duration-150 ease-in-out`}
                    onClick={() => setIsTemporary(!isTemporary)}
                >
                    {
                        isTemporary ? <MessageCircleDashed size={22} /> : <MessageCircle size={22} />
                    }

                </div>
            </TooltipTrigger>
            <TooltipContent className='z-90 mr-5 bg-foreground text-background'>
                <p>Turn {isTemporary ? 'off' : 'on'} temporary chat</p>
            </TooltipContent>
        </Tooltip>
    )
}

export default IsTemporaryChat