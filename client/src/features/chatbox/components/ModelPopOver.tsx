import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import ModelToggle from "./ModelToggle"
import { Plus } from "lucide-react"


const ModelPopOver = () => {
    return (
        <Popover>
            <PopoverTrigger>
                <button className="cursor-pointer flex size-10 outline-0 items-center justify-center p-1 rounded-full hover:bg-accent transition-colors duration-150 ease-in-out">
                    <Plus className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                </button>
            </PopoverTrigger>
            <PopoverContent className="z-96">
                Place content for the popover here.
                <ModelToggle />
            </PopoverContent>
        </Popover>
    )
}

export default ModelPopOver