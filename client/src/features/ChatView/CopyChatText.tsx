import { Copy } from "lucide-react"

const CopyChatText = ({ text, mode }: { text: string, mode: "ai" | "user" }) => {

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(text);
            console.log('Text copied to clipboard successfully');
        } catch (error) {
            console.error('Unable to copy text to clipboard: ', error);
        }
    };

    return (
        <div className={`${mode === "ai" ? '' : 'justify-end'}
            absolute -bottom-12 left-0 flex w-full px-3`}
        >
            <div className={`flex items-center justify-center size-10 z-50 rounded-lg opacity-30 hover:bg-accent hover:opacity-100 transition-all duration-150 ease-in-out`}
                onClick={copyToClipboard}
            >
                <Copy className="rotate-90" size={20} />
            </div>
        </div>
    )
}

export default CopyChatText