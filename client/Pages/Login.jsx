import react, { useEffect } from "react";
import LoginForm from "../Components/LoginForm.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {


  return (
    <>
      <div className="container-fluid LoginContainer vh-100 vw-100 d-flex justify-content-center">
        <LoginForm></LoginForm>
      </div>
    </>
  );
};

export default Login;
