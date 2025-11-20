import { Card, CardContent } from "./ui/card"
import { marked } from "marked";


const AiResponseBox = ({ response }: { response: string }) => {
    const html = marked(response);

    return (
        <div>
            <Card className="py-3">
                <CardContent className="tx-3">
                    <div
                        className="prose prose-invert max-w-full wrap-break-word overflow-x-hidden prose-pre:overflow-x-auto prose-code:break-words"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </CardContent>
            </Card>
        </div>
    )
}
export default AiResponseBox