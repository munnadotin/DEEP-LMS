import "dotenv/config";
import express from 'express';
import authRouter from "./routes/auth.route";
import cookieParser from "cookie-parser";
import courseRouter from "./routes/course.route";
import categoryRouter from "./routes/category.route";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/course", courseRouter);
app.use("/category", categoryRouter);

export default app;