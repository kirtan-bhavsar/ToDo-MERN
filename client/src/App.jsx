  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  // import { faPenToSquare as faPenToSquareRegular} from '@fortawesome/free-solid-svg-icons';
  import { faPenToSquare as faPenToSquareRegular } from '@fortawesome/free-regular-svg-icons';
  import { faX } from '@fortawesome/free-solid-svg-icons';
  import { faTrash } from '@fortawesome/free-solid-svg-icons';
  import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

  const App = () => {

    const [data, setData] = useState({
      title: "",
    });

    const [todos,setTodos] = useState([]);

    const fetchData = async() => {

      try {
        const apiData = await axios.get('http://localhost:5500/api/v1/todos');
        setTodos(apiData.data);
        console.log("fetchData api called successfully");
      } catch (error) {
        console.log(error);
      }

    }

    useEffect(()=> {
      
      fetchData();

    },[]);

    const deleteTask = async(id) => {

      console.log("delete task called");

      try {
        await axios.delete(`/api/v1/delete/${id}`);
        console.log(`Task deleted with the id ${id}`);
        fetchData();
      } catch (error) {
        console.log(error);
      }

    }

    const editTask = async(id,isDone) => {

      const body = {
        isDone : !isDone
      };

      try {
        
        await axios.put(`/api/v1/edit/${id}`,body);
        // await axios.put(`/edit/${id}`,body);

        console.log(`task updated successfully with the id ${id}`);

        fetchData();

      } catch (error) {
        
        console.log(error);

      }

    }

    const addTask = async (e) => {
      console.log(data);

      e.preventDefault();

      try {
        await axios.post("api/v1/add", data);
        console.log("API Call successful");
        fetchData();
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <>
        <div className="container-fluid position-relative bg-dark align-items-center d-flex flex-column">
          <h1 className="text-custom-heading-color my-2 fw-bold">My Todos</h1>
          <div className="add-todo d-flex my-5">
            <input
              type="text"
              htmlFor="title"
              name="title"
              placeholder="Add a new task..."
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="bg-custom-secondary-color addtask-input rounded-3 p-2 text-custom-secondary-color"
            />
            <button className="" type="button" onClick={addTask}>
              Add
            </button>
          </div>
          <div className="list-todos">
            {/* <li className="text-custom-primary-color">
            <div className="todo-task">
              <span><input type="checkbox" /></span>
              task title
              <span>icon 2</span>
              <span>icon 3</span>
            </div>
          </li> */}
            { todos.map((todo) => {
              return(
              <li className="text-custom-primary-color my-3" key={todo._id}>
              <div className="todo-task d-flex bg-custom-secondary-color py-3 h-25">
                {/* <span style={ {width:"5%"} } className="mx-2"><input type="checkbox" /></span> */}
                <span style={{ width: "5%" }} className="mx-2 ">
                  <input onClick={() => editTask(todo._id,todo.isDone)} type="checkbox" checked={todo.isDone} id={`isTodoCompleted-${todo._id}`} class="isTodoCompleted" hidden/>
                  <label
                    htmlFor={`isTodoCompleted-${todo._id}`}
                    class="isTodoCompletedLabel"
                  >
                    <span className="line line1"></span>
                    <span className="line line2"></span>
                  </label>
                </span>
                <span style={{ width: "85%" }} className="">{todo.title}</span>
                {/* <span className="" style={{ width: "5%" }}> */}
                <span  style={{ width: "5%" }}><FontAwesomeIcon className="editTask" icon={faPenToSquare}></FontAwesomeIcon></span>
                {/* </span> */}
                {/* <span className="" style={{ width: "5%" }}>ic</span> */}
                <span onClick={() => deleteTask(todo._id)} style={{ width: "5%" }}><FontAwesomeIcon  className="deleteTask" icon={faTrash}></FontAwesomeIcon></span>
                {/* <span className="" style={{ width: "5%" }}><FontAwesomeIcon icon="fa-regular fa-pen-to-square"></FontAwesomeIcon></span> */}
              </div>
            </li>)
            })
            }
          </div>
        </div>
      </>
    );
  };

  export default App;
