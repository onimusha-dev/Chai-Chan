import api from "@/api/api";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useDataContext } from "@/context/DataContext";

const DataControll = () => {
    const { setSessionList } = useDataContext()
    const handleConfirmDeleteAllChats = () => {
        const res = api.delete('/session/delete-all-chats')
        if (!res) throw new Error('Error deleting all chats')
        setSessionList([]);
    };

    return (
        <div className="px-3">
            <div className="text-base">
                <div className="justify-between items-center flex border-b py-3">
                    Logout of all devices
                    <Dialog>
                        <DialogTrigger className="text-destructive bg-destructive/5 hover:bg-destructive/10 rounded-full border-destructive/25 border py-2 px-5 transition-all duration-300 ease-in-out cursor-pointer">Delete all
                        </DialogTrigger>
                        <DialogContent showCloseButton={false} className="z-70 w-fit">
                            <DialogHeader>
                                <DialogTitle>Clear your chat history - Are you sure??</DialogTitle>
                                <DialogDescription className="justify-end flex w-full mt-5">
                                    <DialogClose onClick={handleConfirmDeleteAllChats} asChild>
                                        <button className="text-destructive bg-destructive/5 hover:bg-destructive/10 rounded-full border-destructive/25 border py-2 px-5 transition-all duration-300 ease-in-out cursor-pointer"
                                        >Confirm Deletion</button>
                                    </DialogClose>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default DataControll