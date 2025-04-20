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
        <TodoHeading/>
        <AddTodo addTask={addTask} addInputRef={addInputRef} setData={setData} data={data} />
        <ListTodos todos={todos} editTask={editTask} isEditing={isEditing} editData={editData} setEditData={setEditData} editTodoTitle={editTodoTitle} setEditing={setEditing} deleteTask={deleteTask} />
      </div>
    </>
  )
}

export default Home;