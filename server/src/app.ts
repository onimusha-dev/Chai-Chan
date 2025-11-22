import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { chatResponse } from "./controller/chat.controller";
import { chatOllama, createMemory, getAllChat, getMemory } from "./controller/ollama.controller";

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.get('health', (req, res) => {
    res.status(200)
        .send("hellow susie!")
})

app.post('/ask-ai', chatResponse)
app.post('/ollama', chatOllama)
app.get('/chats', getAllChat)
app.get('/memory', getMemory)
app.post('/memory', createMemory)


export default app;
