import http from "http";

import cors from "cors";
import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";

import swaggerDoc from "./swagger.json";

import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todos";
import userRoutes from "./routes/user";


class Server {

    app: Express;
    private port: string;
    private server;

    private apiPaths = {
        todos: '/api/todos',
        auth: '/api/auth',
        user: '/api/user',
        docs: '/v1/api-docs'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.server = http.createServer(this.app);

        // Middlewarees
        this.middlewares();

        // Routes definition
        this.routes();
    }

    routes() {
        swaggerDoc.host = process.env.API_HOST || 'localhost:8080';

        this.app.use(this.apiPaths.docs, swaggerUi.serve, swaggerUi.setup(swaggerDoc))
        this.app.use(this.apiPaths.todos, todoRoutes);
        this.app.use(this.apiPaths.user, userRoutes);
        this.app.use(this.apiPaths.auth, authRoutes);
    }

    middlewares() {
        // CORS
        this.app.use(cors());
        // BODY PARSER
        this.app.use(express.json());
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server running on ${this.port} PORT`)
        });
    }

    close(): Promise<void> {
        return new Promise((resolve, reject) => {

            if (this.server) {
                this.server.close((err) => {
                    if (err) {
                        reject(err)
                    } else {
                        console.log("Server closed");
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        })
    }
}

export default Server;