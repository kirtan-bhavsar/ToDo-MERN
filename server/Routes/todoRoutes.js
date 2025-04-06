import express from "express";
import { createTodo } from "../Controllers/todoController.js";

const todoRouter = express.Router();

todoRouter.post("/add", createTodo);

export default todoRouter;
