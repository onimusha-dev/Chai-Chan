import { CornerUpRight, Plus } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useResponseContext } from "@/context/ResponsContext"

const ModelToggle = () => {

    const { model, setModel } = useResponseContext()

    const modelList = [
        {
            model: "gemma3:270m" as const,
            name: "gemma 3"
        },
        {
            model: "granite4:350m" as const,
            name: "granite 4"
        },
        {
            model: "qwen2.5:0.5b" as const,
            name: "qwen 2.5"
        },
        {
            model: "smollm2:135m" as const,
            name: "smollm 2"
        },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="cursor-pointer flex size-10 outline-0 items-center justify-center p-1 rounded-full hover:bg-accent transition-colors duration-150 ease-in-out">
                    <Plus className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end"
                className="mb-3 z-60"
            >
                {
                    modelList.map(m => (
                        <DropdownMenuItem
                            className="px-5"
                            onClick={() => setModel(m.model)}
                        >
                                {
                                    model === m.model && <CornerUpRight size={22} />
                                }
                            <h2 className="text-lg">{m.name}</h2>
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ModelToggle
