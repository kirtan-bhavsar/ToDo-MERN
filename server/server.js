import express from "express";
import dotenv from "dotenv/config";
import connectDB from "./db.js";
import todoRouter from "./Routes/todoRoutes.js";
import cors from "cors";

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(cors());

connectDB();

// Mount Routers
app.use("/api/v1", todoRouter);

// Remove this when going into production
app.get("/api/v1/test", (req, res) => {
  res.status(200).json({ message: "API Running successfully" });
});

app.listen(port, () => {
  console.log(`Server Running successfully on Port ${port}`);
});
