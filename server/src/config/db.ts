import { connect } from "mongoose";

export default async () => {
    try {
        const conn = await connect('mongodb://127.0.0.1:27017/test');

        console.log(conn.connection.host)
    } catch (err){
        console.error("Something got wrong!" + err)
        process.exit(1)
    }
}