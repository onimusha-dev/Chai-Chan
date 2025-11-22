// interface MemoryRequestBody {
//     memory: string
//     userId?: string
// }
// export const createMemory = async (req: Request<{}, {}, MemoryRequestBody>, res: Response, next: NextFunction) => {
//     try {
//         const { memory, userId } = req.body

//         if (!memory) throw Error("memory is empty")

//         const newMemory = await createOllamaMemory(memory)


//         setTimeout(() => {


//             return res.status(200)
//                 .send(
//                     {
//                         status: 200,
//                         memory: newMemory
//                     }
//                 )

//         }, 5000);

//     } catch (err) {
//         console.log("error in the get memory controller. " + err)
//     }
// }


// export const getMemory = async (req: Request<{}, {}, MemoryRequestBody>, res: Response, next: NextFunction) => {
//     try {

//         const memory = await getOllamaMemory()

//         setTimeout(() => {

//             return res.status(200)
//                 .send(
//                     {
//                         status: 200,
//                         memory: memory
//                     }
//                 )

//         }, 5000);


//     } catch (err) {
//         console.log("error in the get memory controller. " + err)
//     }
// }