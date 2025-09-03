import { UserType } from "../models/userModel";

declare global {
  namespace Express {
    export interface Request {
      user?: UserType;
    }
  }
}
