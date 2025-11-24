import { useResponseContext } from "@/context/UiContext"
import { ArrowDown } from "lucide-react"

const SchorllToNewChat = () => {
  
  const { latestResponse } = useResponseContext();
  
  // this is for the scroll to view on click
  const handleClick = () => {
    const el = document.getElementById(latestResponse);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div
      onClick={handleClick}
      className={`${ latestResponse === '#' ? 'hidden' : ''}
        -top-12 absolute left-1/2 p-1 z-50 backdrop-blur-sm rounded-full backdrop-opacity-25`}
    >
      <div className="size-10 flex text-foreground/75 items-center justify-center rounded-full border bg-background dark:bg-sidebar-accent">
        <ArrowDown size={24} />
      </div>
    </div>
  )
}

export default SchorllToNewChat