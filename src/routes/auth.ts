import { Router } from "express";
import { signUpUser, renewSession, signInUser } from "../controllers/auth";
import { jwtValidation } from "../middlewares/jwtValidation";
import { check } from "express-validator";
import { fieldsValidation } from "../middlewares/fieldsValidation";

const router = Router();

router.get("/renew", jwtValidation, renewSession);

router.post("/", [
    check('name', `'name' fied is required`).notEmpty(),
    check('email', `'email' must be email format`).isEmail().notEmpty(),
    check('password', `'Password' fied is required and more than 6 chars`).isLength({
        min: 6
    }),
    fieldsValidation
], signUpUser);

router.post("/signin", [
    check('email', `'email' must be email format`).isEmail().notEmpty(),
    check('password', `'Password' fied is required and more than 6 chars`).isLength({
        min: 6
    }).notEmpty(),
    fieldsValidation
],
    signInUser);


export default router;