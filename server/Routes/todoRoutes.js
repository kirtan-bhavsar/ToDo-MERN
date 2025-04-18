import express from "express";
import {
  createTodo,
  deleteTodo,
  editTodo,
  getAllTodos,
  getTodoById,
} from "../Controllers/todoController.js";
import auth from "../middleware/auth.js";

const todoRouter = express.Router();

todoRouter.post("/add", createTodo);

todoRouter.put("/edit/:id", editTodo);

todoRouter.get("/todos", auth, getAllTodos);

todoRouter.get("/todos/:id", auth, getTodoById);

todoRouter.delete("/delete/:id", deleteTodo);

export default todoRouter;
