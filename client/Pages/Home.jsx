import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import TodoHeading from "../Components/TodoHeading.jsx";
import AddTodo from "../Components/AddTodo.jsx";
import ListTodos from "../Components/ListTodos.jsx";
import { successNotification,errorNotification } from "../Utils/Notifications.js";
import CheckSound1 from "../Assets/CheckSound1.mp3";

const Home = () => {

  const playCheckSound = () => {
    new Audio(CheckSound1).play();
  }



    // Use States
  const [isEditing, setEditing] = useState(null);

  const [displayCompleteTodos,setDisplayCompleteTodos] = useState(false);

  const [user,setUser] = useState({
    name:""
  })

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
      let apiData;
      if(displayCompleteTodos){
         apiData = await axios.get("/api/v1/todos?isDone=true");
      }else{
         apiData = await axios.get("/api/v1/todos?isDone=false")
      }
      // apiData = await axios.get('/api/v1/todos');
      setTodos(apiData.data);
      if (isEditing) {
        setEditing(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const displayCompletedTodos = (e) => {
    const checkState = e.target.checked;
    setDisplayCompleteTodos(checkState);
    fetchData();
  }

  const addTask = async (e) => {

    e.preventDefault();

    try {
      await axios.post("/api/v1/add", data);
      data.title = "";
      addInputRef.current.focus();
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {

    try {
      await axios.delete(`/api/v1/delete/${id}`);
      fetchData();
      successNotification("Task deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = async (id, isDone) => {
    playCheckSound();
    const body = {
      isDone: !isDone,
    };

    try {
      await axios.put(`/api/v1/edit/${id}`, body);


      fetchData();

      successNotification("Task completed successfully");

    } catch (error) {
      console.log(error);
    }
  };

  // const editTask = async(id,isDone) => {

  //   const updatedTodos = todos.map((todo)=> {
  //     todo._id === id ? {...todo,isDone:!isDone} : todo
  //   })

  //   setTodos(updatedTodos);

  //   const body = {isDone:!isDone}

  //   try {
  //     await axios.post(`/api/v1/edit/${id}`,body);
  //     setTimeout(fetchData,1500)
  //   } catch (error) {
  //     console.log(error);
  //     setTodos(todos);
  //   }

  // }

const getUser = async() => {

    try {
       const res = await axios.get('/api/v1/user/auth');
       setUser({name:res.data.data.name});
    } catch (error) {
        
    }

}


  
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
      successNotification("Task edited successfully");
      console.log("Edit Todo Title called after clicking check butotn");
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect
  useEffect(() => {
    fetchData();
    getUser();
  }, [displayCompleteTodos]);

  return (
    <>
    <div className="container-fluid Container position-relative bg-custom-primary-color align-items-center d-flex flex-column">
        <TodoHeading user={user} />
        <AddTodo addTask={addTask} addInputRef={addInputRef} setData={setData} data={data} displayCompletedTodos={displayCompletedTodos} />
        <ListTodos todos={todos} editTask={editTask} isEditing={isEditing} editData={editData} setEditData={setEditData} editTodoTitle={editTodoTitle} setEditing={setEditing} deleteTask={deleteTask} />
      </div>
    </>
  )
}

export default Home;