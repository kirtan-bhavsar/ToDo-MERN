import Todo from "../Models/Todo.js";

const createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);

    todo.save();

    res.status(200).json({ message: "Todo Added Successfully", data: todo });
  } catch (error) {}
};

export { createTodo };
