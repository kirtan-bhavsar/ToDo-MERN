import React from "react";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { successNotification,errorNotification } from "../Utils/Notifications";
import { useState } from "react";
// import dotenv from 'dotenv/config';

// demo comment added
const TodoHeading = ({user}) => {

    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const navigate = useNavigate();

    const logout = async() => {

        try {
         
        const response = await axios.post(`${apiUrl}/api/v1/user/logout`,{ withCredentials: true });
        // const response = await axios.post(`/api/v1/user/logout`);

        navigate('/login');

        successNotification('Logout Successful !');
        
        
        } catch (error) {
            
            errorNotification(error.response.data.message);

            console.log(error);

        }   

    }

    return (
        <>
        <div className="HeaderContainer">
            {/* <h1 className="text-custom-heading-color HeaderHeadingPage my-2 fw-bold">My Todos</h1> */}
            <h1 className="text-custom-heading-color HeaderHeading fw-bold">Hello {user.name}! - What is on your List?</h1>
            {/* <h1 className="text-custom-heading-color HeaderHeading fw-bold">`${user.name}`</h1> */}
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="HeaderLogoutButton" onClick={logout}></FontAwesomeIcon>
            </div>
        </>
    )

}

export default TodoHeading;