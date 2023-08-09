import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import adminRouter from "./routes/admin";
import userRouter from "./routes/user";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017", { dbName: "courses" });

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
