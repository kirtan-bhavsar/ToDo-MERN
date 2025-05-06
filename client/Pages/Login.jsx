import react, { useEffect, useState } from "react";
import LoginForm from "../Components/LoginForm.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dotenv from 'dotenv/config';

const Login = () => {

  const apiUrl = process.env.VITE_API_BASE_URL;

  const navigate = useNavigate();

  const[isAuthenticated,setIsAuthenticated] = useState(false);

  useEffect(() => {

   const checkLoginStatus = async() => {


      try {
        
      const response =   await axios.get(`${apiUrl}/api/v1/user/auth`);

      if(response.status === 200){
        setIsAuthenticated(true);
        navigate('/home');
      } else {
        setIsAuthenticated(fale);
      }

      } catch (error) {
        console.log(error);
      }

    }

    checkLoginStatus();

  },[]);

  return (
    <>
      <div className="container-fluid LoginContainer vh-100 vw-100 d-flex justify-content-center">
        <LoginForm></LoginForm>
      </div>
    </>
  );
};

export default Login;
