  import React, { useState } from "react";
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

    const addTask = async (e) => {
      console.log(data);

      e.preventDefault();

      try {
        await axios.post("http://localhost:5500/api/v1/add", data);
        console.log("API Call successful");
      } catch (error) {
        console.log(error);
      }
    };

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
            <li className="text-custom-primary-color">
              <div className="todo-task d-flex bg-custom-secondary-color py-3 h-25">
                {/* <span style={ {width:"5%"} } className="mx-2"><input type="checkbox" /></span> */}
                <span style={{ width: "5%" }} className="mx-2 ">
                  <input type="checkbox" id="isTodoCompleted" hidden/>
                  <label
                    htmlFor="isTodoCompleted"
                    id="isTodoCompletedLabel"
                  >
                    <span className="line line1"></span>
                    <span className="line line2"></span>
                  </label>
                </span>
                <span style={{ width: "85%" }} className="">Todo Title</span>
                <span className="" style={{ width: "5%" }}>
                <span className="" style={{ width: "5%" }}><FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon></span>
                </span>
                {/* <span className="" style={{ width: "5%" }}>ic</span> */}
                <span className="" style={{ width: "5%" }}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></span>
                {/* <span className="" style={{ width: "5%" }}><FontAwesomeIcon icon="fa-regular fa-pen-to-square"></FontAwesomeIcon></span> */}
              </div>
            </li>
          </div>
        </div>
      </>
    );
  };

  export default App;
