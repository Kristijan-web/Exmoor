import express from "express";
import userRouter from "./routes/userRouter";
import globalErrorMiddleware from "./controllers/errorController";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// omoguci parsiranje body-a

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
// setup global error handling middleware
app.use(globalErrorMiddleware);

export default app;
