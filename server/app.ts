import express from "express";
import userRouter from "./routes/userRouter";

const app = express();

// omoguci parsiranje body-a

app.use(express.json());

app.use("/api/v1/users", userRouter);

export default app;
