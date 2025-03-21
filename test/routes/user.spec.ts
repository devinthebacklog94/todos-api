import dotenv from "dotenv";

import * as dbConnection from "../database";
import request from 'supertest';
import Server from '../../src/server';
import { UserMock, UserMockTest } from "../mocks/user";

dotenv.config();

let api: request.Agent;
let server: Server;
let xToken: String;

describe('User Profile Endpoint', () => {
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

    it('should return User Profile', async () => {
        const response = await api.get('/api/user/profile')
            .set("x-token", `${xToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                ok: expect.any(Boolean),
                user: expect.objectContaining({
                        _id: expect.any(String),
                        name: expect.any(String),
                        email: expect.any(String),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                    }
                )
            })
        );
    });

});