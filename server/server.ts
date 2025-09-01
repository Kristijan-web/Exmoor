import dotenv from "dotenv";
dotenv.config({
  path: "./config.env",
});
import app from "./app";
import mongoose from "mongoose";

if (!process.env.CONNECTION_STRING || !process.env.DB_PASSWORD) {
  console.log("No connection string or password");
  process.exit(1);
}

const CONNECTION_STRING = process.env.CONNECTION_STRING.replace(
  "DB_PASSWORD",
  process.env.DB_PASSWORD
);

mongoose.connect(CONNECTION_STRING).then(() => {
  console.log("Db connection succesful");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening for requests on port ${PORT}`);
});
