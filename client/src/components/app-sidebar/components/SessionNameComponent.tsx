import api from "@/api/api";
import { useEffect, useRef, useState } from "react";

export const SessionNameComponent = (
    { name, isEditing, sessionId, setIsEditing }: { name: string, sessionId: string, isEditing: string, setIsEditing: (isEditing: string) => void }
) => {
    const [isEditingName, setIsEditingName] = useState(name)
    const inputRef = useRef(null);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    })
    //  this is for closing the editing on clicking outside of it
    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setIsEditingName(name)
                setIsEditing('')
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);
    const hnadleSubmit = async () => {
        if (isEditingName === name) return setIsEditing('')

        const res = await api.put(`/session/${sessionId}`, { name: isEditingName })
        console.log(res.data)
        if (!res) throw new Error('renaming session failed!')
        setIsEditing('')
    }

    return (
        isEditing === sessionId ? (
            <div className={`${isEditing !== sessionId && 'mask-[linear-gradient(to_right,black_75%,transparent_100%)]'} py-4 w-full text-nowrap overflow-hidden`}>
                <input ref={inputRef}
                    className='bg-blue-600/25 h-6 w-full outline-none px-3'
                    onChange={e => setIsEditingName(e.target.value)}
                    value={isEditingName}
                    onKeyDown={(e) => {
                        e.stopPropagation()
                        if (e.key === "Enter") {
                            hnadleSubmit();
                        }
                    }}
                />
            </div>
        ) : (
            <span className={`py-4 w-full text-nowrap overflow-hidden mask-[linear-gradient(to_right,black_75%,transparent_100%)]`}
            >
                {isEditingName}
            </span>
        )
    )
}