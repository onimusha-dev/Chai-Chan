// import { Request, Response, NextFunction } from "express";
// import { askGemini } from "../service/askGemini.service";
// import type { SelectModel } from "../service/askGemini.service";

// interface requestBody {
//     prompt: string
//     model: SelectModel
// }

// export const chatResponse = async (req: Request<{}, {}, requestBody>, res: Response, next: NextFunction) => {
//     try {
//         const { prompt } = req.body;
//         const reply = await askGemini(prompt)

//         if (!reply) throw Error("error from google ai shit!")

//         return res.status(200)
//             .send({
//                 status: 200,
//                 response: reply
//             })
//     } catch (err) {
//         console.error("error in chat controller" + '\n' + err)
//         next(err)
//     }
// }