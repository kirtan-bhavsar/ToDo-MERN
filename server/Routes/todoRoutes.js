import express from "express";
import {
  createTodo,
  deleteTodo,
  editTodo,
  getAllTodos,
  getTodoById,
} from "../Controllers/todoController.js";

const todoRouter = express.Router();

todoRouter.post("/add", createTodo);

todoRouter.put("/edit/:id", editTodo);

todoRouter.get("/todos", getAllTodos);

todoRouter.get("/todos/:id", getTodoById);

todoRouter.delete("/delete/:id", deleteTodo);

export default todoRouter;
