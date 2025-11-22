import http from "k6/http";
import { sleep } from "k6";
// k6 does NOT run TS natively — it only understands JS.
// But we'll compile this file to JS in a moment.
// export const options = {
//     vus: 3000,
//     duration: "3s",
// };
// let i = 0;
// export default function () {
//     const params = {
//         headers: { "Content-Type": "application/json" }
//     };
//     http.get("http://localhost:5001/chats", params);
//     sleep(1);
// }
// Define models FIRST
const models = [
    "gemma3:270m",
    "smollm2:135m",
    "smollm2:360m",
    "granite4:350m",
    "qwen2.5:0.5b",
    "qwen2.5-coder:0.5b",
    // "qwen2.5-coder:1.5b",
    // "deepseek-r1:1.5b",
    // "tinyllama:1.1b",
    // "sailor2:1b"
];
const prompts = [
    "Hello, model. Let's see if you're awake today.",
    "Hi there, LLM. I'm sending a simple test message.",
    "Greetings, system. Respond however you please.",
    "Hey model, I'm checking your processing loop.",
    "Hello LLM, this is just a routine evaluation.",
    "Hi model, show me that your tokens are flowing.",
    "Greetings, machine mind. This is a standard request.",
    "Hello there, just verifying your response time.",
    "Hi LLM, consider this a tiny performance poke.",
    "Hello system, I'm running a k6 load test.",
    "Hey model, let's see how you handle this input."
];
let i = 0;
let j = 0;
export const options = {
    vus: 3,
    duration: "30s",
};
function getNextModel() {
    const model = models[i];
    i = (i + 1) % models.length;
    return model;
}
function getNextPrompt() {
    const prompt = prompts[j];
    j = (j + 1) % prompts.length;
    return prompt;
}
export default function () {
    const payload = JSON.stringify({
        model: getNextModel(),
        prompt: getNextPrompt(),
        collection: "Collection 2"
    });
    const params = {
        headers: { "Content-Type": "application/json" }
    };
    http.post("http://localhost:5001/ollama", payload, params);
    sleep(1);
}
