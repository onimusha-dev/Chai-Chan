import http from "k6/http";
import { sleep } from "k6";
// k6 does NOT run TS natively — it only understands JS.
// But we'll compile this file to JS in a moment.
export const options = {
    vus: 5,
    duration: "30s",
};
export default function () {
    const payload = JSON.stringify({
        prompt: "hello",
        model: "gemma3:270m",
        collection: "Collection 2"
    });
    const params = {
        headers: { "Content-Type": "application/json" }
    };
    http.post("http://localhost:5001/ollama", payload, params);
    sleep(1);
}
