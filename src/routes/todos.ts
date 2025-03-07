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
    fieldsValidation
],
    createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);


export default router;