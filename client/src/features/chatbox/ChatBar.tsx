import { useState } from "react"
import { Mic, Send } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"
import api from "@/utils/api"
import { useResponseContext } from "@/context/ResponsContext"
import ModelToggle from "./ModelToggle"
import SchorllToNewChat from "./SchorllToNewChat"

const ChatBar = () => {
    const [prompt, setPrompt] = useState("");
    const { responses, model, setResponses, setIsThinking, setLatestResponse } = useResponseContext();

    const sendPrompt = async () => {
        if (!prompt.trim()) return;

        const collection = 'Collection 1'

        try {
            setIsThinking(true)
            
            const res = await api.post("ollama", { model, prompt, collection });
            
            const newObject = {
                id: res.data.response.id,
                prompt: prompt,
                response: res.data.response.response
            };
            
            console.log("newObject =", newObject);
            
            const newResponses = [...responses, newObject];
            
            setResponses(newResponses);
            setLatestResponse(newObject.id)
            
        } catch (err) {
            console.error("Error:", err);
            
        } finally {
            setPrompt("");
            setIsThinking(false)
        }
    };

    return (
        <div className="flex flex-col absolute left-0 bottom-0 w-full z-70 px-5 pb-15 pt-1 bg-background ">
            <Card className="w-full rounded-full py-2">
                <CardContent className="flex gap-3 px-3">
                    <div className="cursor-pointer flex size-10 items-center justify-center p-1 rounded-full hover:bg-accent transition-colors duration-150 ease-in-out">
                        <ModelToggle />
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

            {/*  */}
            <div className="absolute bottom-0 left-0 w-full h-10 flex items-center justify-center select-none">
                <h1 className="text-sm h-5">SastaAI can make mistakes. Check important info. See &nbsp;
                    <button className="w-fit underline cursor-pointer h-5">Cookie Preferences</button>.</h1>
            </div>

            {/* schroll to new chat */}
            <div className="-top-12 left-0 absolute w-full flex items-center justify-center">
                <SchorllToNewChat />
            </div>
        </div>
    )
}

export default ChatBar
