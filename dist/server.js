"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const controller_1 = require("./controller/controller");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const mongoUri = "mongodb+srv://manthan:ZTpiyW.rbg3EWmf@cluster0.wla2j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
app.use(express_1.default.json());
app.post("/signup", controller_1.signUp);
app.post("/signin", controller_1.signIn);
mongoose_1.default
    .connect(mongoUri)
    .then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.error("Database connection error:", error);
});
