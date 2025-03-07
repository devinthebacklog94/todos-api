import dotenv from "dotenv";
import Server from "./src/server";
import DBConfig from "./src/database/config";

//Entrypoint
dotenv.config();

const server = new Server();
const dbConnection = new DBConfig();

server.listen();
dbConnection.connect();