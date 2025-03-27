import { Document, Types } from 'mongoose';
import TodoSchema, { Todo } from '../models/todos';

export const getUserTodos = async (user: string | undefined) => {

    if (!user) throw new Error(`Error getting user information`);


    const todos = await TodoSchema.find({ user });

    if (todos.length > 0) return todos;

    return [];
}

export const createUserTodo = async (user: string | undefined, body: Todo): Promise<Document<unknown, {}, Todo>> => {
    if (!user) throw new Error(`Error getting user information`);

    const todoData: Todo = {
        ...body,
        user
    }
    return TodoSchema.create(todoData);
}

export const updateUserTodo = async (id: string | undefined, body: Todo) => {
    if (!id) throw new Error(`Error getting Todo information`);

    const updatedTodo = await TodoSchema.findByIdAndUpdate(id, body, { new: true });

    return updatedTodo;
}

export const removeTodo = async (id: string | undefined): Promise<string> => {

    if (!id) throw new Error(`Error getting Todo information`);

    await TodoSchema.findByIdAndDelete(id);

    return id;
}

export const getTodoById = async (todoId: string): Promise<(Document<unknown, {}, Todo> & Todo & {
    _id: Types.ObjectId;
} & {
    __v: number;
})> => {
    const todo = await TodoSchema.findById(todoId);

    if (!todo) {
        throw new Error(`Error finding ${todoId}`);
    }

    return todo;
}
