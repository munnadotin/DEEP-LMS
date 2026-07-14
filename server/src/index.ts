import "dotenv/config";
import express from 'express';
import authRouter from "./routes/auth.route";
import cookieParser from "cookie-parser";
import courseRouter from "./routes/course.route";
import categoryRouter from "./routes/category.route";
import enrollRouter from "./routes/enroll.route";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use("/auth", authRouter);
app.use("/course", courseRouter);
app.use("/category", categoryRouter);
app.use("/enroll", enrollRouter);

export default app;