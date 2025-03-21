// express.d.ts
import "express";

declare module "express-serve-static-core"  {
    export interface Request {
        uid?: string;
        name?: string;
    }
}
