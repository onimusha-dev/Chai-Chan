import { Plus } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Models } from "@/context/ResponsContext"

const ModelToggle = ({ setModel }: { setModel: (model: Models) => void }) => {

    const modelList = [
        { model: "gemma3:270m" as const },
        { model: "granite4:350m" as const },
        { model: "qwen2.5:0.5b" as const },
        { model: "smollm2:135m" as const },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="cursor-pointer flex size-10 items-center justify-center p-1 rounded-full hover:bg-accent transition-colors duration-150 ease-in-out">
                    <Plus className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end"
                className="mb-3 z-60"
            >
                {
                    modelList.map(model => (
                        <DropdownMenuItem
                            className="px-5"
                            onClick={() => setModel(model.model)}
                        >
                            <h2 className="text-lg">{model.model}</h2>
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ModelToggle
