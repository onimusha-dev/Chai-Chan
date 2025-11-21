import http from "k6/http";
import { sleep } from "k6";

// k6 does NOT run TS natively — it only understands JS.
// But we'll compile this file to JS in a moment.

export const options = {
    vus: 10,
    duration: "10s",
};

export default function () {
    const payload = JSON.stringify({
        prompt: "hello",
        model: "gemma3:270m"
    });

    const params = {
        headers: { "Content-Type": "application/json" }
    };

    http.post("http://localhost:3000/ask", payload, params);
    sleep(1);
}
