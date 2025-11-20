import { useState } from "react"
import { Mic, Plus, Send } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"
import api from "@/utils/api"
import { useResponseContext } from "@/context/ResponsContext"

const ChatBar = () => {
    const [prompt, setPrompt] = useState("");
    const { responses, setResponses } = useResponseContext();
    const model = "gemma3:270m"  // "gemma3:270m" | "smollm2:135m" | "granite4:350m"

    const sendPrompt = async () => {
        if (!prompt.trim()) return;

        try {
            const res = await api.post("ollama", { model, prompt });

            console.log("Server replied:", res);

            const newObject = {
                id: res.data.response.id,
                prompt: prompt,
                response: res.data.response.response
            };
            console.log("newObject =", newObject);

            const newResponses = [...responses, newObject];

            setResponses(newResponses);

        } catch (err) {
            console.error("Error:", err);
        } finally {
            setPrompt("");
        }
    };

    return (
        <div className="flex flex-col absolute left-0 bottom-5 w-full z-60 px-5 pb-10">
            <Card className="w-full rounded-full py-2">
                <CardContent className="flex gap-3 px-3">
                    <div className="cursor-pointer flex size-10 items-center justify-center p-1 rounded-full hover:bg-accent transition-colors duration-150 ease-in-out">
                        <Plus size={28} />
                    </div>

                    <input
                        type="text"
                        className="w-full outline-0"
                        placeholder="What's on your mind?"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendPrompt()}
                    />

                    <div className="flex ml-5 gap-3">
                        <div className="cursor-pointer flex size-10 items-center justify-center p-1 rounded-full hover:bg-accent transition-colors duration-150 ease-in-out">
                            <Mic size={22} />
                        </div>

                        <div
                            onClick={sendPrompt}
                            className="cursor-pointer flex size-10 items-center justify-center p-1 rounded-full hover:bg-white hover:text-black transition-colors duration-150 ease-in-out"
                        >
                            <Send size={22} />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="absolute bottom-0 left-0 w-full h-10 flex items-center justify-center select-none">
                <h1 className="text-sm h-5">SastaAI can make mistakes. Check important info. See &nbsp;
                    <button className="w-fit underline cursor-pointer h-5">Cookie Preferences</button>.</h1>
            </div>
        </div>
    )
}

export default ChatBar
