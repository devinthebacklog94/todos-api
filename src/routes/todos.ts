import { Router } from "express";
import { check } from "express-validator";

import { createTodo, deleteTodo, getTodo, getTodos, updateTodo } from "../controllers/todos";
import { jwtValidation } from "../middlewares/jwtValidation";
import { fieldsValidation } from "../middlewares/fieldsValidation";

const router = Router();


// All Endpoints require authentication
router.use((req, res, next) => jwtValidation(req, res, next));

router.get("/", getTodos);
router.get("/:id", getTodo);
router.post("/", [
    check('title', `'title' fied is required`).notEmpty(),
    check('status').isIn(["ON_HOLD","IN_PROGRESS", "FINISHED"]),
    fieldsValidation
],
    createTodo);
router.put("/:id",
    check('status').isIn(["ON_HOLD","IN_PROGRESS", "FINISHED"]),
    fieldsValidation, updateTodo);
router.delete("/:id", deleteTodo);


export default router;