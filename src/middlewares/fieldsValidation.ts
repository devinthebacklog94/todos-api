import { NextFunction, Response, Request } from "express";
import { validationResult } from "express-validator";

export const fieldsValidation = (req: Request, res:Response, next: NextFunction) => {
    // handling error messages

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
        return;
    }
    next();
}