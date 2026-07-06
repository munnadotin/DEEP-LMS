import "dotenv/config";
import express from 'express';
import connectDB from "./config/database";

const app = express();
connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})