import react from "react";
import LoginForm from "../Components/LoginForm.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

  const loginUser = async (email, password) => {
    const body = {
      email,
      password,
    };

    try {
      await axios.post("/api/v1/login", body);
      console.log("user logged in successfully from front-end");
      navigate('/home');
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <>
      <div className="container-fluid LoginContainer vh-100 vw-100 d-flex justify-content-center">
        <LoginForm></LoginForm>
      </div>
    </>
  );
};

export default Login;
