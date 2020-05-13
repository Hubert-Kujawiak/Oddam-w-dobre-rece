import React from "react";
import {Link} from "react-router-dom";
import ReactScroll from "./ReactScroll";
import {withFirebase} from './Firebase'
import SignOutButton from "./SignOut";


function ConstantHeaderAfterLogin({ firebase }) {
    // const user = firebase?.auth()?.currentUser?.email
    return (
        <div className="constantHeader">
            {console.log(firebase?.auth?.currentUser?.email)}
            <div className="logIn">
                <span>Cześć {firebase.getCurrentUser()}</span>
                <Link to="/giveback">Oddaj rzeczy</Link>
                <Link to="/logout"><SignOutButton/></Link>
            </div>
            <div className="navMenu">
                <Link to="/loginpage">Start</Link>
                <ReactScroll/>
            </div>
        </div>
    )
}

export default withFirebase(ConstantHeaderAfterLogin);