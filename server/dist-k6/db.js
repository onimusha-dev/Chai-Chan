import http from "k6/http";
import { sleep } from "k6";
// Define models FIRST
const models = [
    "gemma3:270m",
    "smollm2:135m",
    "smollm2:360m",
    "granite4:350m",
    "qwen2.5:0.5b",
    "qwen2.5-coder:0.5b",
    "qwen2.5-coder:1.5b",
    "deepseek-r1:1.5b",
    "tinyllama:1.1b",
    "sailor2:1b"
];
let i = 0;
export const options = {
    vus: 1,
    duration: "3s",
};
function getNextModel() {
    const model = models[i];
    i = (i + 1) % models.length;
    return model;
}
export default function () {
    const payload = JSON.stringify({
        model: getNextModel(),
        prompt: "hello",
        collection: "Collection 2"
    });
    const params = {
        headers: { "Content-Type": "application/json" }
    };
    http.post("http://localhost:5001/ollama", payload, params);
    sleep(1);
}
