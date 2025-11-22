import { useResponseContext } from "@/context/ResponsContext"
import { ArrowDown } from "lucide-react"

const SchorllToNewChat = () => {

  const { latestResponse } = useResponseContext();

  const handleClick = () => {
    const el = document.getElementById(latestResponse);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      onClick={() => handleClick}
      className="size-10 flex text-foreground/75 items-center justify-center rounded-full border bg-accent-foreground/5">
      <ArrowDown size={24} />
    </div>
  )
}

export default SchorllToNewChat