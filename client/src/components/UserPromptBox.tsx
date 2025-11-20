import { Card, CardContent } from "./ui/card"
import ReactMarkdown from "react-markdown";

const UserPromptBox = ({ prompt }: { prompt: string }) => {
  return (
    <div>
      <Card className="py-3">
        <CardContent className="px-3">
          <div className="prose prose-invert max-w-full wrap-break-word overflow-x-hidden prose-pre:overflow-x-auto prose-code:break-words">
            <ReactMarkdown>{prompt}</ReactMarkdown>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserPromptBox