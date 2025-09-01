"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: "./config.env",
});
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
if (!process.env.CONNECTION_STRING || !process.env.DB_PASSWORD) {
    console.log("No connection string or password");
    process.exit(1);
}
const CONNECTION_STRING = process.env.CONNECTION_STRING.replace("DB_PASSWORD", process.env.DB_PASSWORD);
mongoose_1.default.connect(CONNECTION_STRING).then(() => {
    console.log("Db connection succesful");
});
const PORT = process.env.PORT || 3000;
app_1.default.listen(PORT, () => {
    console.log(`Listening for requests on port ${PORT}`);
});
