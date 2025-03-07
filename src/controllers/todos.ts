import { Request, Response } from "express";
import { createUserTodo, getTodoById, getUserTodos, removeTodo, updateUserTodo } from "../services/todoService";

export const getTodos = async (req: Request, res: Response) => {
    try {
        const todos = await getUserTodos(req.uid);
        res.json(todos);
    } catch (error) {
        const msg = error instanceof Error ? error.message : 'Please contact to the API Provider'
        res.status(500).json({
            ok: false,
            msg
        })
    }
}


export const getTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const todo = await getTodoById(id);

        res.json({ todo });

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                ok: false,
                msg: 'Please contact to the API Provider',
                error: error.message
            });
        }
    }
}

export const createTodo = async (req: Request, res: Response) => {
    try {
        const todoSaved = await createUserTodo(req.uid, req.body);
        res.json({
            msg: "CreatedTodo",
            created: todoSaved
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Please contact to the API Provider',
            error
        });
    }
}

export const updateTodo = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const updatedTodo = await updateUserTodo(id, body);

        res.json({
            ok: true,
            updatedTodo
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                ok: false,
                msg: 'Please contact to the API Provider',
                error: error.message
            });
        }
    }

}

export const deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {

        const todoId = await removeTodo(id);

        res.json({
            msg: "DeleteTodo",
            id: todoId
        });

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                ok: false,
                msg: 'Please contact to the API Provider',
                error: error.message
            });
        }
    }
}
