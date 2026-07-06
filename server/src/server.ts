import "dotenv/config";
import connectDB from "./config/database";
import app from "./index";
import { connectRedis } from "./config/redis";

connectDB();
connectRedis();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
