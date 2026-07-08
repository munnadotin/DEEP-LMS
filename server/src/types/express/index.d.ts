import { IUserUser } from "../User.type";

declare global {
    namespace Express {
        interface Request {
            user?: IUserUser;
        }
    }
}

export { };