import { Request, Response } from "express";
import { getUserProfile, newUser, renewJwtSession, signIn } from "../services/authService";


export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await getUserProfile(req.uid);

        res.json({
            ok: true,
            user
        })

    } catch (error) {
        const msg = error instanceof Error ? error.message : "User not found";

        res.status(500).json({
            ok: false,
            msg
        })
    }
}

export const signInUser = async (req: Request, res: Response) => { 
    const {email, password} = req.body;

    try {

        const { id, token} = await signIn(email, password);
      
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

export const createUser = async (req: Request, res: Response) => {
    try {
        let {id, token} = await newUser(req.body);

        res.status(201).json({
            ok: true,
            id, 
            token
        });        
    } catch (error) {
        if(error instanceof Error) {
            res.status(500).json({
                ok: false,
                error: error.message
            });
        }
    }
}


export const renewSession = async (req: Request, res: Response) => {
    const {uid} = req;
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



