import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare as faPenToSquareRegular } from "@fortawesome/free-regular-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Home from "../Pages/Home";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


const App = () => {
  

  return (
    <>
    <Router>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      </Routes>
      </Router>
    </>
  );
};

// demo comment for v1
// demo comment for V2 which will be reflected in V2 branch but not in V1 brach

export default App;
