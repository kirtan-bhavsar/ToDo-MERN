import React from "react";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TodoHeading = () => {

    return (
        <>
        <div className="HeaderContainer">
            {/* <h1 className="text-custom-heading-color HeaderHeadingPage my-2 fw-bold">My Todos</h1> */}
            <h1 className="text-custom-heading-color HeaderHeading fw-bold">My Todos</h1>
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="HeaderLogoutButton"></FontAwesomeIcon>
            </div>
        </>
    )

}

export default TodoHeading;