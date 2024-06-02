import express from "express";
import mongoose from "mongoose";
import { signUp, signIn } from "./controller/controller";

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;

app.use(express.json());

app.post("/signup", signUp);
app.post("/signin", signIn);

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
