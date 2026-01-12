import express from "express";
import userRouter from "./routes/userRouter";
import globalErrorMiddleware from "./controllers/errorController";
import cookieParser from "cookie-parser";
import cors from "cors";
import productRouter from "./routes/productRouter";
import path from "path";

const app = express();

// omoguci parsiranje body-a

app.use(
  cors({
    origin: ["http://localhost:5173", "https://exmoorparfemi.netlify.app"],
    credentials: true,
  })
);
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
// setup global error handling middleware
app.use(globalErrorMiddleware);
export default app;
