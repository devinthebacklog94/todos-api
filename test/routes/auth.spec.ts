import dotenv from "dotenv";

import * as dbConnection from "../database";
import request from 'supertest';
import Server from '../../src/server';
import { UserMock, UserMockTest } from "../mocks/user";

dotenv.config();

let api: request.Agent;
let server: Server;
let xToken: String;

describe('User Auth Endpoint', () => {
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
       const response = await api.post('/api/auth')
            .send(UserMock);
        xToken = response.body.token;
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

    it('should return a new user succesfully ', async () => {
        const response = await api.post('/api/auth')
            .send(UserMockTest)

        expect(response.status).toBe(201);
        expect(response.body).toEqual(
            expect.objectContaining({
                id: expect.any(String),
                token: expect.any(String),
            })
        )
    });

    it('should return 400 when a required field is missing', async () => {
        const response = await api.post('/api/auth')
            .send({
                name: UserMock.name,
                password: UserMock.password
            })

        expect(response.status).toBe(400);
        expect(response.body).toEqual(
            expect.objectContaining({
                ok: expect.any(Boolean),
                errors: expect.any(Object)
            })
        );
    });

    it('should return 400 when user already exists', async () => {
        const response = await api.post('/api/auth')
            .send(UserMock);

        expect(response.status).toBe(500);
        expect(response.body).toEqual(
            expect.objectContaining({
                ok: expect.any(Boolean),
                error: expect.any(String)
            })
        );
    });

    it('should return a 500 status code when user enters wrong password', async () => {
        const response = await api.post('/api/auth/signin')
            .send({
                email: "crventra@test.com",
                password: "user123a"
            });

        expect(response.status).toBe(500);
        expect(response.body).toEqual(
            expect.objectContaining({
                ok: expect.any(Boolean),
                msg: expect.any(String),
            })
        );
    });

    it('should return a new JWT token', async () => {
        const response = await api.get('/api/auth/renew')
            .set("x-token", `${xToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                ok: expect.any(Boolean),
                id: expect.any(String),
                token: expect.any(String)
            })
        );
    });

});