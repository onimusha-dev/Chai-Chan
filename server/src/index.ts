import { env } from "./config/env";
import connectDB from "./config/db";
import app from "./app";

const port = 'http://172.16.0.6:5173/'

async function server() {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        })
    } catch (error) {
        throw Error("error start the server!!")
    }
}
server()