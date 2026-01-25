import dotenv from "dotenv";
dotenv.config({
  path: "./config.env",
});
import app from "./app";
import mongoose from "mongoose";
import User from "./models/userModel";

if (!process.env.CONNECTION_STRING || !process.env.DB_PASSWORD) {
  console.log("No connection string or password");
  process.exit(1);
}

const CONNECTION_STRING = process.env.CONNECTION_STRING.replace(
  "DB_PASSWORD",
  process.env.DB_PASSWORD
);

// Kada se ovde desi greska treba da se pozove funkcija koja ce da ugasi server
mongoose.connect(CONNECTION_STRING).then(() => {
  console.log("Db connection succesful");
});

Promise.all([
  User.init(),
  // Product.init(),
  // Order.init(),
]);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening for requests on port ${PORT}`);
});
