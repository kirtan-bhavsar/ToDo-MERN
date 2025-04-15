import Todo from "../Models/Todo.js";

const createTodo = async (req, res) => {
  try {
    req.body.title = req.body.title.trim();

    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const todo = await Todo.create(req.body);

    todo.save();

    res.status(200).json({ message: "Todo Added Successfully", data: todo });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();

    if (!todos) {
      return res.status(400).json({ message: "No todos found" });
    }

    res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTodoById = async (req, res) => {
  const id = req.params.id;

  const userId = req.user.id;

  if (!userId) {
    return res
      .status(400)
      .json({ message: "User not authorized to perform this action" });
  }

  // console.log(req.headers["x-auth-token"]);
  // console.log(
  //   req.headers.authorization.split(" ")[1] + "printed from controller"
  // );

  if (!id) {
    return res
      .status(400)
      .json({ message: "Id is compulsary to fetch the data" });
  }

  const todo = await Todo.findById(id);

  if (!todo) {
    return res.status(400).json({ message: "No todo found for this id." });
  }

  return res.status(200).json(todo);
};

const editTodo = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Id required to perform edit action" });
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "No todo found with this id" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "Todo Updated Successfully", data: updatedTodo });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteTodo = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Id required to perform delete action" });
  }

  const todo = await Todo.findById(id);

  if (!todo) {
    return res.status(400).json({ messge: "No todo found with this id" });
  }

  await Todo.findByIdAndDelete(id);

  res.status(200).json({ message: "Todo deleted successfully" });
};

export { createTodo, editTodo, getAllTodos, getTodoById, deleteTodo };
