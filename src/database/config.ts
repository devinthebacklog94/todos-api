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
            throw new Error('Error in DB Connection');
        }
    }

    async disconnect() {
        await mongoose.disconnect();
    }
}

export default DBConfig;