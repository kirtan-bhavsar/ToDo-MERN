import react from 'react';
import {Link} from 'react-router-dom';

const SignupForm = () => {
    return(
        <div className='SignupForm'>
        <h3 className='SignupFormHeading'>Create Account</h3>
        <p className='SignupFormParagraph'>Get started with your task management</p>
        <form>
            <div className="InputGroup">
                <label htmlFor="">Username</label>
                <input type='text' placeholder='coolmate_16'></input>
            </div>
            <div className="InputGroup">
                <label htmlFor="">Email</label>
                <input required type='text' placeholder='you@example.com'></input>
            </div>
            <div className="InputGroup">
                <label htmlFor="">Password</label>
                <input required type='password' placeholder='••••••••'></input>
            </div>
            <div className="InputGroup">
                <label htmlFor="">Confirm Password</label>
                <input required type='password' placeholder='••••••••'></input>
            </div>
            <button type='submit'>Signup</button>
        </form>
        <div className="footer">Already have an account? <span><Link className='LoginLink' to='/'>Login</Link></span></div>
        </div>
    )
}

export default SignupForm;