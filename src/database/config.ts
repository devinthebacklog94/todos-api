/** 
 * @file DBconfig
 * 
 * Here we are using a Singleton Pattern
 * 
*/

import mongoose from "mongoose";

import * as dotenv from 'dotenv';

dotenv.config();
class DBConfig {

    async connect() {
        try {
            await mongoose.connect(process.env.DB_URL || "");
            console.log(`Database Online on ${process.env.DB_URL} PORT`)
        } catch (error) {
            let message = "";
            if (error instanceof Error)
                message = error.message ? error.message : 'Error in DB Connection';
            throw new Error(message);
        }
    }

    async disconnect() {
        await mongoose.disconnect();
    }
}

export default DBConfig;