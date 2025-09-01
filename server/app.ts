import express from "express";
import userRouter from "./routes/userRouter";
import globalErrorMiddleware from "./controllers/errorController";
import cookieParser from "cookie-parser";

const app = express();

// omoguci parsiranje body-a

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
// setup global error handling middleware
app.use(globalErrorMiddleware);
export default app;
