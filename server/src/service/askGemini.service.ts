import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env";
import { extractText } from "../utils/gemini";

const gemini_api_key = env.geminiAPI;

const ai = new GoogleGenAI({
    apiKey: gemini_api_key
});

export type SelectModel = "gemini-2.5-flash" | "gemini-2.5-flash"

export const askGemini = async (prompt: string, model?: SelectModel): Promise<{ id: string, response: string } | void> => {
    try {

        const response = await ai.models.generateContent({
            model: model || "gemini-2.5-flash",
            contents: prompt,
        });

        if (!response) {
            throw Error('We are facing a lot of users so go fuck your selves!')
        }

        const result = await ai.models.generateContent({
            model: model || "gemini-2.5-flash",
            contents: prompt,
        });

        const id = result.responseId ?? crypto.randomUUID();

        // The actual text lives inside:
        // result.response.candidates[0].content.parts[0].text
        const text = result.text ?? extractText(response)

        console.log(response);
        return { id, response: text };

    } catch (err) {
        console.error("error talking to gemini. " + '\n' + err)
    }
}
