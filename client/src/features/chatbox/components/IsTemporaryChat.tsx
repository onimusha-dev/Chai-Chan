import { useUiContext } from '@/context/UiContext'
import { MessageCircle, MessageCircleDashed } from 'lucide-react'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useDataContext, type SessionItem } from '@/context/DataContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const IsTemporaryChat = () => {
    const { isTemporary, setIsTemporary } = useUiContext()
    const { sessionList, setLatestSession, setSessionList, setResponses } = useDataContext()
    const navigator = useNavigate()


    const handleToggle = () => {
        if (isTemporary) {
            /**
             * the type needs to be fixed although it's working
             */
            setSessionList((prev: SessionItem[]) => {
                if (!Array.isArray(prev)) return [];
                return prev.slice(0, -1);
            });

            setIsTemporary(!isTemporary)
            setLatestSession('')
            setResponses([])
            navigator('/')
        }
        else {
            setIsTemporary(true)
            setLatestSession('temporory-session')
            setResponses([])
            setSessionList([...sessionList, { name: "Temporary Chat", sessionId: 'temporory-session', createdAt: Date.toString() }])
            navigator('/')
        }
    }

    useEffect(() => {
        const handleShortcut = (e: KeyboardEvent) => {
            const isCtrl = e.ctrlKey || e.metaKey   // metaKey = ⌘ on Mac
            const isShift = e.shiftKey
            const isC = e.key.toLowerCase() === "c"

            if (isCtrl && isShift && isC) {
                e.preventDefault()
                handleToggle()
            }
        }

        window.addEventListener("keydown", handleShortcut)
        return () => window.removeEventListener("keydown", handleShortcut)
    }, [isTemporary])

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    className={`${isTemporary && "text-red-500"}
                                   absolute right-5 cursor-pointer flex items-center hover:bg-accent size-10 justify-center p-1 rounded-full transition-colors duration-150 ease-in-out`}
                    onClick={handleToggle}
                >
                    {
                        isTemporary ? <MessageCircleDashed size={22} /> : <MessageCircle size={22} />
                    }
                </button>
            </TooltipTrigger>
            <TooltipContent className='mr-5 bg-foreground text-background select-none'>
                <p>Turn {isTemporary ? 'off' : 'on'} temporary chat</p>
            </TooltipContent>
        </Tooltip>
    )
}

export default IsTemporaryChat