import { Request, Response } from "express";
import { signUp, renewJwtSession, signIn } from "../services/authService";

export const signInUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {

        const { id, token } = await signIn(email, password);

        res.json({
            ok: true,
            id,
            token
        })

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Please contact the API Provider"

        res.status(500).json({
            ok: false,
            msg: errorMessage
        });
    }
}

export const signUpUser = async (req: Request, res: Response) => {
    try {
        let { id, token } = await signUp(req.body);

        res.status(201).json({
            ok: true,
            id,
            token
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                ok: false,
                error: error.message
            });
        }
    }
}


export const renewSession = async (req: Request, res: Response) => {
    const { uid } = req;
    try {
        const token = await renewJwtSession(uid);
        res.json({
            ok: true,
            id: uid,
            token
        });

    } catch (error) {
        const msg = error instanceof Error ? error.message : "Error Getting user token";
        res.status(500).json({
            ok: false,
            msg
        });
    }
}



