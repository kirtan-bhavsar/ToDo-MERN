import express from "express";

const app = express();

app.use(express.json());

app.listen(5500, () => {
  console.log("Server Running successfully on Port 5500");
});

app.get("/api/v1/test", (req, res) => {
  res.status(200).json({ message: "API Running successfully" });
});
