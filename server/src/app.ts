import express, { Express, Request, Response } from "express";
import timeRouter from "./route/timeRoute";

import mongoose from "mongoose";
import userRouter from "./route/userRoute";
import adminRouter from "./route/adminRoute";

const { PORT, MONGO_URL, MONGODB_NAME } = process.env;
const cors = require("cors");
const app: Express = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/time", timeRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);

mongoose.connect("mongodb://localhost:27017/Worktime");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB Connection error"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.get("/", (req: Request, res: Response) => {
  res.send("SERVER HEALTH OKAY");
});

app.listen(port, () => {
  console.log(">>>>> OPEN WK SERVER http://192.168.75.160:5000");
});
