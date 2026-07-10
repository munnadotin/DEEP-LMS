import "dotenv/config";
import express from 'express';
import authRouter from "./routes/auth.route";
import cookieParser from "cookie-parser";
import courseRouter from "./routes/course.route";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/course", courseRouter);

export default app;