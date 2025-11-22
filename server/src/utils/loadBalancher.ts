const ports = [5001, 5002, 5003, 5004];
let i = 0;

export function getOllamaUrl() {
    const url = `http://localhost:${ports[i]}`;
    i = (i + 1) % ports.length;
    return url;
}
