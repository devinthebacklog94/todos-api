import mongoose from "mongoose";


class DBConfig {

    async connect() {
        try {
            await mongoose.connect(process.env.DB_URL || "");
            console.log(`Database Online on ${process.env.DB_URL} PORT`)
        } catch (error) {
            throw new Error('Error in DB Connection');
        }
    }

}

export default DBConfig;