import { Router } from "express";
import { jwtValidation } from "../middlewares/jwtValidation";
import { getUser } from "../controllers/user";

const router = Router();

router.get("/profile", jwtValidation, getUser);


export default router;