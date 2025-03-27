
import TodoSchema, { Todo } from '../../src/models/todos';
import { createUserTodo, getTodoById, getUserTodos, removeTodo, updateUserTodo } from '../../src/services/todoService';
import { TodoMock } from '../mocks/todos';

jest.mock('../../src/models/todos');
describe('Tests in todoService', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should throw error if user does not have todos', async () => {
        await expect(getUserTodos(undefined)).rejects.toThrow("Error getting user information");
    });

    test('should sucessfully return todos', async () => {
        (TodoSchema.find as jest.Mock).mockResolvedValue([{
            id: "4321",
            title: "test",
            notes: "firts",
            status: "ON_HOLD",
            user: "1234"
        }]);
        const result = await getUserTodos("1234");
        await expect(result.length).toEqual(1);
    });

    test('should return an empty array if user does not have todos', async () => {
        (TodoSchema.find as jest.Mock).mockResolvedValue([]);
        const result = await getUserTodos("1234");
        await expect(result.length).toEqual(0);
    });

    test('should throw an error message if user is not provided', async () => {
        await expect(createUserTodo(undefined, TodoMock as Todo)).rejects.toThrow(`Error getting user information`)
    });

    test('should create a Todo succesfully ', async () => {
        (TodoSchema.create as jest.Mock).mockResolvedValue(TodoMock)
        const result = await createUserTodo("1234", TodoMock as Todo);

        await expect(result).toEqual(expect.objectContaining({
            title: expect.any(String),
            notes: expect.any(String),
            status: expect.any(String)
        }))
    });

    test('should throw an error if todo is not found', async () => {
        (TodoSchema.findById as jest.Mock).mockResolvedValue(null);
        await expect(getTodoById("1234")).rejects.toThrow(`Error finding 1234`)
    });

    test('should return a Todo by Id succesfull', async () => {
        (TodoSchema.findById as jest.Mock).mockResolvedValue(TodoMock as Todo);
        const result = await getTodoById("1234");
        expect(result).toEqual(expect.objectContaining({
            title: expect.any(String),
            notes: expect.any(String),
            status: expect.any(String)
        }));
    });

    test('should return a Todo by Id succesfull', async () => {
        (TodoSchema.findById as jest.Mock).mockResolvedValue(TodoMock as Todo);
        const result = await getTodoById("1234");
        
        expect(result).toEqual(expect.objectContaining({
            title: expect.any(String),
            notes: expect.any(String),
            status: expect.any(String)
        }));
    });


    test('should succesfully update a Todo ', async () => {
        (TodoSchema.findByIdAndUpdate as jest.Mock).mockResolvedValue(TodoMock as Todo);
        const todoBody = { title: "First", notes: "None", status: "IN_PROGRESS" };
        const result = await updateUserTodo("1234", todoBody as Todo);
        
        expect(result).toEqual(expect.objectContaining({
            title: "TEST_1: Todo Test",
            notes: "Example note for ToDo",
            status: "ON_HOLD"
        }));
    });

    test('should throw an error message if id Todo to delete is not provided', async () => {
        await expect(removeTodo(undefined)).rejects.toThrow(`Error getting Todo information`)
    });

    test('should removed succesfully a Todo ', async () => {
        (TodoSchema.findByIdAndDelete as jest.Mock).mockResolvedValue("1234");
        const result = await removeTodo(TodoMock.id);
        expect(result).toEqual("1234");

    });
});