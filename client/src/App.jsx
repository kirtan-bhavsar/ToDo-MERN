import React, { useState } from "react";
import axios from 'axios';
// import { useState } from "react";
import {FaMapMarker} from 'react-icons/fa';


const App = () => {

  const [data,setData] = useState({
    title:""
  });

const addTask = async(e) => {

  console.log(data);

  e.preventDefault();

  try {
    await axios.post('http://localhost:5500/api/v1/add',data);
    console.log("API Call successful");
  } catch (error) {
    console.log(error);
  }

}

  return (
    <>
      <div className="container-fluid bg-dark vh-100  align-items-center d-flex flex-column">
        <h1 className="text-custom-heading-color my-2 fw-bold">My Todos</h1>
        <div className="add-todo d-flex my-5">
        <input
          type="text"
          htmlFor="title"
          name="title"
          placeholder="Add a new task..."
          onChange={(e) => setData({...data,title:e.target.value})}
          className="bg-custom-secondary-color addtask-input rounded-3 p-2 text-custom-secondary-color"
        />
        <button className="" type="button" onClick={addTask}>Add</button>
      </div>
      <div className="list-todos">
        <li className="text-custom-primary-color">
          <div className="todo-task">
            <span><input type="checkbox" /></span>
            task title
            <span>icon 2</span>
            <span>icon 3</span>
          </div>
        </li>
        <li className="text-custom-primary-color">
          <div className="todo-task d-flex">
            <span style={ {width:"10%"} }><input type="checkbox" /></span>
            <span style={ {width:"50%"} }>Todo Title</span>
            <span style={ {width:"15%"} }><FaMapMarker/></span>
            <span style={ {width:"15%"} }>icon 3</span>
          </div>
        </li>
        </div>
      </div>
    </>
  );
};

export default App;
