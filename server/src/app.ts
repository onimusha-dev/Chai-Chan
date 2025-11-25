import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { chatOllama, getAllChat } from "./controller/chat.controller";
import { createMemory, getMemory } from "./controller/memory.controller";
import { createSession, updateSession, getSession } from "./controller/session.controller";
import router from "./router";
import { authMiddleware } from "./middleware/auth.middleare";
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://0.0.0.0:5173/', 'http://0.0.0.0:5174/'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use((req, res, next) => {
    console.log(`${req.method}  ${req.url}  ${req.ip}  `)
    next()
})



app.get('/health', authMiddleware, (req, res) => {
    res.status(200)
        .send("hellow susie!")
})

app.use("/", router);

// app.post('/ask-ai', chatResponse)
app.post('/chat', chatOllama)
app.get('/chat/:sessionId', getAllChat)


app.post('/memory', createMemory)
app.get('/memory/:userId', getMemory)

app.post('/session/:userId', createSession);
app.get('/session/:userId', getSession)
app.put('/session/:sessionId', updateSession)


export default app;
 