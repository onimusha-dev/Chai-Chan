import { env } from "./config/env";
import connectDB from "./config/db";
import app from "./app";



async function server() {
    try {
        await connectDB();
        app.listen(env.port, () => {
            console.log(`Server running on http://localhost:${env.port}`);
        })
    } catch (error) {
        throw Error("error start the server!!")
    }
}
server()