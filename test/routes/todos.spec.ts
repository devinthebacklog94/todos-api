import dotenv from "dotenv";

import request from 'supertest';

import * as dbConnection from "../database";
import Server from '../../src/server';

import { UserMock } from "../mocks/user";
import { TodoMock, TodoMockById, TodoMockCreated } from "../mocks/todos";

dotenv.config();

let api: request.Agent;
let server: Server;
let xToken: string;

describe('Todos Endpoint', () => {
    beforeAll(async () => {
        try {
            await dbConnection.connect();
            server = new Server();
            api = await request(server.app);
            await server.listen();
        } catch (error) {
            const msj = error instanceof Error ? error.message : "Error setting up server"
            throw new Error(msj);
        }
    });

    beforeEach(async () => {
        const userResponse = await api.post('/api/auth')
            .send(UserMock);
        xToken = userResponse.body.token;;
    });

    afterEach(async () => {
        await dbConnection.clearDatabase();
    });

    afterAll(async () => {
        try {
            await dbConnection.closeDatabase();

            await server.close();
        } catch (error) {
            const msj = error instanceof Error ? error.message : "Error closing resources"
            throw new Error(msj);
        }
    })
    it('should return 201 in a succesfull To Do', async () => {
        const response = await api.post('/api/todos')
            .set("x-token", `${xToken}`)
            .send(TodoMock)

        expect(response.status).toBe(201);
        expect(response.body).toEqual(
            expect.objectContaining(TodoMockCreated)
        );
    });

    it('should return 201 after creating a succesfull To Do', async () => {
        const response = await api.post('/api/todos')
            .set("x-token", `${xToken}`)
            .send(TodoMock)

        expect(response.status).toBe(201);
        expect(response.body).toEqual(
            expect.objectContaining(TodoMockCreated)
        );
    });

    it('should return 201 after creating a succesfull To Do', async () => {
        const response = await api.post('/api/todos')
            .set("x-token", `${xToken}`)
            .send(TodoMock)

        expect(response.status).toBe(201);
        expect(response.body).toEqual(
            expect.objectContaining(TodoMockCreated)
        );
    });

    it('should return 201 after creating a succesfull To Do', async () => {
        const response = await api.post('/api/todos')
            .set("x-token", `${xToken}`)
            .send(TodoMock)

        expect(response.status).toBe(201);
        expect(response.body).toEqual(
            expect.objectContaining(TodoMockCreated)
        );
    });

    it('should return 400 if is missing the title field To Do', async () => {

        const { title, ...removeTitle } = TodoMock;

        const response = await api.post('/api/todos')
            .set("x-token", `${xToken}`)
            .send(removeTitle)

        expect(response.status).toBe(400);
        expect(response.body).toEqual(
            expect.objectContaining({
                ok: expect.any(Boolean),
                errors: expect.any(Object)
            })
        );
    });

    it('should return 200 status with a list of ToDos', async () => {
        await api.post('/api/todos')
            .set("x-token", `${xToken}`)
            .send(TodoMock);

        const response = await api.get('/api/todos')
            .set("x-token", `${xToken}`);

        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(1);
    });

    it('should return 200 status with a list of ToDos without Todos as []', async () => {
        const response = await api.get('/api/todos')
            .set("x-token", `${xToken}`);

        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(0);
    });

    it('should return 200 status getting a To do by Id', async () => {
        const todo = await api.post('/api/todos')
            .set("x-token", `${xToken}`)
            .send(TodoMock);

        if (todo.body.ok) {
            const { id } = todo.body.created;
            const response = await api.get(`/api/todos/${id}`)
                .set("x-token", `${xToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                expect.objectContaining(TodoMockById)
            );
        }
    });

    it('should return 200 status getting a To do by Id', async () => {
        const todo = await api.post('/api/todos')
            .set("x-token", `${xToken}`)
            .send(TodoMock);

        if (todo.body.ok) {
            const { id } = todo.body.created;
            const response = await api.get(`/api/todos/${id}`)
                .set("x-token", `${xToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                expect.objectContaining(TodoMockById)
            );
        }
    });

    it('should return 500 status when To do does not exist', async () => {

        const id = "67db3bf9a4ea30274e6d9a57";
        const response = await api.get(`/api/todos/${id}`)
            .set("x-token", `${xToken}`);

        expect(response.status).toBe(500);
        expect(response.body).toEqual(
            expect.objectContaining({
                ok: false,
                error: `Error finding ${id}`
            })
        );
    });


});