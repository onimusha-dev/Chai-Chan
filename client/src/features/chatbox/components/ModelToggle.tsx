import { CornerUpRight, Plus } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUiContext } from "@/context/UiContext"
import { modelList } from "@/utils/models"

const ModelToggle = () => {

    const { model, setModel, setIsReasoning } = useUiContext()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="cursor-pointer flex size-8 items-center justify-center p-1 rounded-full hover:bg-accent transition-colors duration-150 ease-in-out">
                    <Plus className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end"
                className="mb-3 z-60"
            >
                {
                    modelList.map((m, id) => (
                        <DropdownMenuItem
                            key={id}
                            className={`${model === m.model && 'bg-accent'} px-5`}
                            onClick={() => {
                                setModel(m.model)
                                m.reasoning !== true && setIsReasoning(false)
                            }}
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
