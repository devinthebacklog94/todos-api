
import express, { Express } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./swagger.json";


import todoRoutes from "./routes/todos";
import authRoutes from "./routes/auth";


class Server {

    private app: Express;
    private port: string;

    private apiPaths = {
        todos: '/api/todos',
        auth: '/api/auth',
        docs: '/v1/api-docs'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';

        // Middlewarees
        this.middlewares();

        // Routes definition
        this.routes();
    }

    routes() {
        swaggerDoc.host = process.env.API_HOST || 'localhost:8080';

        this.app.use(this.apiPaths.docs, swaggerUi.serve, swaggerUi.setup(swaggerDoc))
        this.app.use(this.apiPaths.todos, todoRoutes);
        this.app.use(this.apiPaths.auth, authRoutes);
    }

    middlewares() {
        // CORS
        this.app.use(cors());
        // BODY PARSER
        this.app.use(express.json());
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on ${this.port} PORT`)
        });
    }
}

export default Server;