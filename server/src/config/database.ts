import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGODB_URL!);
        console.log("Connected to MongoDB", res.connection.host);
        return res.connection.host;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;