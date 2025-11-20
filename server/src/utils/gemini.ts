// helper function 
export function extractText(r: any): string {
    return r?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
}