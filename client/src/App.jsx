import React, { useState } from "react";
import axios from 'axios';
// import { useState } from "react";


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
      <div className="container-fluid bg-dark justify-content-center align-items-center d-flex flex-column">
        <h1 className="text-custom-heading-color fw-bold">My Todos</h1>
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
      </div>
    </>
  );
};

export default App;
