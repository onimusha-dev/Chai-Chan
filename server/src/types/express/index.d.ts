import { IUserDocument } from "../../models/user.model";

declare global {
    namespace Express {
        // Override Express' idea of req.user
        interface User extends IUserDocument { }

        interface Request {
            user?: IUserDocument;
        }
    }
}

export { };
