import React from 'react'
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {

  const [data,setData] = useState({
    email:"",
    password:""
  });

   const navigate = useNavigate();

   const onChange = (e) => {
    setData({...data,[e.target.name]:e.target.value});
   }
  
    const loginUser = async (e,data) => {

      console.log('loginUser called in the LoginForm.jsx');

      e.preventDefault();

      try {
        await axios.post("/api/v1/user/login", data);
        console.log("user logged in successfully from front-end");
        navigate('/home');
      } catch (error) {
          console.log(error);
      }
    }

  return (
    <>
    <div className='LoginForm'>
    <h2 className='LoginFormHeading'>Welcome Back</h2>
    <p className='LoginFormParagraph'>Login to continue to your tasks</p>
    
        <form onSubmit={(e) => loginUser(e,data)}>
        <div className="InputGroup">
        <label htmlFor="" className='d-inline-block'>Email</label>
        <input required type="text" name='email' onChange={(e) => onChange(e)} className='d-inline-block' placeholder='you@example.com'/>
        </div>
        <div className="InputGroup">
        <label htmlFor="" className='d-inline-block'>Password</label>
        <input required type="password" name='password' onChange={(e) => onChange(e)} placeholder='••••••••'/>
        </div>
        <button type='submit'>Login</button>
    </form>
    <div className="divider">or</div>
    <div className="footer">Don't have an account? <span><Link className="SignupLink" to='/signup'>Sign up</Link></span></div>
    </div>
    </>
  )
}

export default LoginForm