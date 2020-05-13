import React from "react";
import {Link} from "react-router-dom";
import ReactScroll from "./ReactScroll";

import SignOutButton from "./SignOut";

// import * as ROUTES from "../constants/routes";



export default function ConstantHeaderAfterLogin() {

    return (
        <div className="constantHeader">
            <div className="logIn">
                <span>Cześć .....</span>
                <Link to="/">Oddaj rzeczy</Link>
                <Link to="/logout"><SignOutButton/></Link>
            </div>
            <div className="navMenu">
                <Link to="/#">Start</Link>
                <ReactScroll/>
            </div>
        </div>
    )
}