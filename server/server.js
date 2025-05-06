import express from "express";
import dotenv from "dotenv/config";
import connectDB from "./db.js";
import todoRouter from "./Routes/todoRoutes.js";
import cors from "cors";
import userRouter from "./Routes/userRoutes.js";
import cookieParser from "cookie-parser";
import path from "path";
import url from "url";

const app = express();
const port = process.env.PORT || 5000;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__filename + " __filename");
console.log(__dirname + " __dirname");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3500",
    credentials: true,
  })
);

app.use(cookieParser());

connectDB();

// Mount API Routers
app.use("/api/v1", todoRouter);
app.use("/api/v1/user", userRouter);

// // Serve static files from the 'client' directory for requests to the root path '/'
// app.use("/", express.static(path.join(__dirname, "client")));

// // The "catchall" handler: for any request that doesn't match API routes or static files,
// // send back the main index.html.
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "index.html"));
// });

app.get("/api/v1/trial", (req, res) => {
  res.status(200).json({ message: "API Running successfully" });
});

app.listen(port, () => {
  console.log(`Server Running successfully on Port ${port}`);
});
