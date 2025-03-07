import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";

interface UserValidation {
    uid: string,
    name: string
}

export const jwtValidation = (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('x-token');

    if(!token) {
        res.status(401).json({
            ok: false,
            msg: 'Needs authentication'
        });

        return;
    }

    try {

        const { uid, name } = JWT.verify(
            token,
            process.env.SECRET_JWT_SEED || ""
        ) as UserValidation;

        req.uid = uid;
        
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Invalid Token'
        });
        return;
    }

    next();
}