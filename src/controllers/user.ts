import { Request, Response } from "express";
import { getUserProfile } from "../services/userService";

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await getUserProfile(req.uid);

        res.json({
            ok: true,
            user
        });

    } catch (error) {
        const msg = error instanceof Error ? error.message : "User not found";

        res.status(500).json({
            ok: false,
            msg
        });
    }
}