import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { chatOllama, getAllChat } from "./controller/chat.controller";
import { createMemory, getMemory } from "./controller/memory.controller";
import authRoutes from "./router/auth.router"
import { createSession, getSession } from "./controller/session.controller";
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

// app.post('/ask-ai', chatResponse)
app.post('/chat', chatOllama)
app.get('/chats/:sessionId', getAllChat)


app.post('/memory', createMemory)
app.get('/memory/:userId', getMemory)

app.post('/:userId', createSession);
app.get('/:userId', getSession)

app.use("/auth", authRoutes);

export default app;
 