import { useUiContext } from "@/context/UiContext";
import ModelToggle from "./ModelToggle";
import { Brain, Globe } from "lucide-react";

const ChatBoxTools = () => {
  const { model, setIsReasoning, isReasoning, setIsSearching, isSearching } = useUiContext()
  
  return (
    <>
      <div className="flex gap-3">
        <div className="cursor-pointer flex size-10 items-center justify-center p-1 rounded-full hover:bg-accent transition-colors duration-150 ease-in-out">
          <ModelToggle />
        </div>
        {/*   this is for web serfing  */}
        {
          // (
          //     // model === 'qwen3-vl:2b' ||
          //     // model === 'qwen3:0.6b' ||
          //     // model === 'qwen3:1.7b'
          //     true
          // ) && (
          <button
            className={`${isSearching ? 'px-4 py-1 border border-violet-500/50 bg-violet-950/50 ' : 'size-10 p-1 hover:bg-accent '}
                            cursor-pointer flex items-center justify-center text-violet-500 rounded-full transition-colors duration-150 ease-in-out`}
            onClick={() => setIsSearching(!isSearching)}
          >
            <div className="flex ">
              <Globe size={22} />
              {isSearching && (
                <p className="text-sm ml-1 thinking-text-violet-dark">
                  Search
                </p>
              )}
            </div>
          </button>
          // )
        }

        {/*  this is the btn for enabling thinking mode only available for specific models */}
        {
          (
            model === 'qwen3-vl:2b' ||
            model === 'qwen3:0.6b' ||
            model === 'qwen3:1.7b'
          ) && (
            <button
              className={`${isReasoning ? 'px-4 py-1 border border-violet-500/50 bg-violet-950/50 ' : 'size-10 p-1 hover:bg-accent '}
                            cursor-pointer flex items-center justify-center text-violet-500 rounded-full transition-colors duration-150 ease-in-out`}
              onClick={() => setIsReasoning(!isReasoning)}
            >
              <div className="flex ">
                <Brain size={22} />
                {isReasoning && (
                  <p className="text-sm ml-1 thinking-text-violet-dark">
                    Thinking
                  </p>
                )}
              </div>
            </button>
          )
        }
      </div>
    </>
  )
}

export default ChatBoxTools