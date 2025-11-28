import { Bot } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const ModelPopOver = () => {
    return (
        <Dialog>
            <DialogTrigger className={`border border-green-500/50 bg-green-950/50 size-10 hover:bg-accent cursor-pointer flex items-center justify-center text-green-500 rounded-full transition-colors duration-150 ease-in-out`}
            >
                <Bot size={22} />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default ModelPopOver