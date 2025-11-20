

export default async () => {
    try {
        setTimeout(() => {
            console.log("server got connected!")
        }, 3000);

    } catch (err){
        console.error("Something got wrong!" + err)
        process.exit(1)
    }
}