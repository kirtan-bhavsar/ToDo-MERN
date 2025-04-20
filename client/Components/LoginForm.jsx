import React from 'react'
import {Link} from 'react-router-dom';

const LoginForm = () => {
  return (
    <>
    <div className='LoginForm'>
    <h2 className='LoginFormHeading'>Welcome Back</h2>
    <p className='LoginFormParagraph'>Login to continue to your tasks</p>
    
        
        <form>
        <div className="InputGroup">
        <label htmlFor="" className='d-inline-block'>Email</label>
        <input required type="text" className='d-inline-block' placeholder='you@example.com'/>
        </div>
        <div className="InputGroup">
        <label htmlFor="" className='d-inline-block'>Password</label>
        <input required type="password" placeholder='••••••••'/>
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