import { env } from "./config/env";
import connectDB from "./config/db";
import app from "./app";


async function server() {
    try {
        await connectDB();
        app.listen(Number(env.port), '0.0.0.0', () => {
            console.log(`Server running on http://0.0.0.0:${env.port}`);
        });
    } catch (error) {
        throw Error("error start the server!!")
    }
}
server()
