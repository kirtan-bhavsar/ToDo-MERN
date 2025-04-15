import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import TodoHeading from "../Components/TodoHeading.jsx";
import AddTodo from "../Components/AddTodo.jsx";
import ListTodos from "../Components/ListTodos.jsx";

const Home = () => {

    // Use States
  const [isEditing, setEditing] = useState(null);

  const [data, setData] = useState({
    title: "",
  });

  const [editData, setEditData] = useState({
    title: "",
  });

  const [todos, setTodos] = useState([]);

//   useRefs
  const addInputRef = useRef(null);

  // Event Listeners for tasks
  const fetchData = async () => {
    try {
      const apiData = await axios.get("/api/v1/todos");
      setTodos(apiData.data);
      console.log("fetchData api called successfully");
      if (isEditing) {
        setEditing(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async (e) => {
    console.log(data);

    e.preventDefault();

    try {
      await axios.post("api/v1/add", data);
      console.log("API Call successful");
      data.title = "";
      addInputRef.current.focus();
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    console.log("delete task called");

    try {
      await axios.delete(`/api/v1/delete/${id}`);
      console.log(`Task deleted with the id ${id}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = async (id, isDone) => {
    const body = {
      isDone: !isDone,
    };

    try {
      await axios.put(`/api/v1/edit/${id}`, body);

      console.log(`task updated successfully with the id ${id}`);

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  
  const editTodoTitle = async (id) => {
    const body = {
      title: editData.title,
    };

    try {
      await axios.put(`/api/v1/edit/${id}`, body);
      fetchData();
      // setEditing(null);
      setEditData({
        title: "",
      });
      console.log("Edit Todo Title called after clicking check butotn");
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <div className="container-fluid position-relative bg-dark align-items-center d-flex flex-column">
        {/* <h1 className="text-custom-heading-color my-2 fw-bold">My Todos</h1> */}
        <TodoHeading/>
        {/* <form className="add-todo d-flex my-5" onSubmit={addTask}>
          <input
            ref={addInputRef}
            type="text"
            name="title"
            placeholder="Add a new task..."
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="bg-custom-secondary-color addtask-input rounded-3 p-2 text-custom-secondary-color"
            autoFocus
          />
          <button className="" type="submit">
            Add
          </button>
        </form> */}
        <AddTodo addTask={addTask} addInputRef={addInputRef} setData={setData} data={data} />
        {/* <div className="list-todos">
          {todos.map((todo) => {
            return (
              <li className="text-custom-primary-color my-3" key={todo._id}>
                <div className="todo-task d-flex bg-custom-secondary-color py-3 h-25">
                  <span style={{ width: "5%" }} className="checkSpan">
                    <input
                      onClick={() => editTask(todo._id, todo.isDone)}
                      type="checkbox"
                      checked={todo.isDone}
                      id={`isTodoCompleted-${todo._id}`}
                      className="isTodoCompleted"
                      hidden
                    />
                    <label
                      htmlFor={`isTodoCompleted-${todo._id}`}
                      className="isTodoCompletedLabel"
                    >
                      <span className="line line1"></span>
                      <span className="line line2"></span>
                    </label>
                  </span>
                  {isEditing === todo._id ? (
                    <input
                      // ref={editInputRef}
                      style={{ width: "85%" }}
                      className="titleDisplayInput"
                      autoFocus
                      type="text"
                      value={editData.title}
                      onChange={(e) => {
                        console.log("edit data input field called");
                        setEditData({ ...editData, title: e.target.value });
                      }}
                      onKeyDown={(e) => {
                        //e.preventDefault();
                        if (e.key == 'Enter') {
                          editTodoTitle(todo._id);
                        }
                      }}
                    ></input>
                  ) : (
                    <span style={{ width: "85%" }} className="titleDisplaySpan">
                      {todo.title}
                    </span>
                  )}
                  {isEditing === todo._id ? (
                    <span style={{ width: "5%" }}>
                      <FontAwesomeIcon
                        onClick={(e) => {
                          // setEditing(null);
                          // setEditData({ ...editData, title: e.target.value });
                          // setEditData(editData);
                          editTodoTitle(todo._id);
                        }}
                        className="editTask"
                        icon={faCheck}
                      ></FontAwesomeIcon>
                    </span>
                  ) : (
                    <span style={{ width: "5%" }}>
                      <FontAwesomeIcon
                        className="editTask"
                        icon={faPenToSquare}
                        onClick={() => {
                          setEditing(todo._id);
                          console.log("edit button clicked");
                          setEditData({ ...editData, title: todo.title });
                        }}
                      ></FontAwesomeIcon>
                    </span>
                  )}
                  <span
                    onClick={() => deleteTask(todo._id)}
                    style={{ width: "5%" }}
                  >
                    <FontAwesomeIcon
                      className="deleteTask"
                      icon={faTrash}
                    ></FontAwesomeIcon>
                  </span>
                </div>
              </li>
            );
          })}
        </div> */}
        <ListTodos todos={todos} editTask={editTask} isEditing={isEditing} editData={editData} setEditData={setEditData} editTodoTitle={editTodoTitle} setEditing={setEditing} deleteTask={deleteTask} />
      </div>
    </>
  )
}

export default Home;