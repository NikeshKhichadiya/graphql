import mongoose, { ConnectOptions, Mongoose } from "mongoose";

const connectDB = async (): Promise<void> => {
    if (!process.env.MONGO_URL) {
        throw new Error('MONGO_URL is not defined in the environment variables');
    }

    const conn: Mongoose = await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions);

    console.log(`Database connected to the host ${conn.connection.host}`);
}

export default connectDB;