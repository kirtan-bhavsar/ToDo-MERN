import React from 'react'

const LoginForm = () => {
  return (
    <>
    <div className='LoginForm'>
    <h2 className='LoginFormHeading'>Welcome Back</h2>
    <p className='LoginFormParagraph'>Login to continue to your tasks</p>
    
        
        <form>
        <div className="InputGroup">
        <label htmlFor="" className='d-inline-block'>Email</label>
        <input type="text" className='d-inline-block' placeholder='you@example.com'/>
        </div>
        <div className="InputGroup">
        <label htmlFor="" className='d-inline-block'>Password</label>
        <input type="password" placeholder='••••••••'/>
        </div>
        <button type='submit'>Login</button>
    </form>
    </div>
    </>
  )
}

export default LoginForm