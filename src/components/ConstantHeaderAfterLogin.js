import React from "react";
import {Link} from "react-router-dom";
import ReactScroll from "./ReactScroll";
// import * as ROUTES from "../constants/routes";



export default function ConstantHeaderAfterLogin() {

    return (
        <div className="constantHeader">
            <div className="logIn">
                <span>JAKIES IMIE</span>
                <Link to="/">Wyloguj</Link>
                <Link to="/">Oddaj rzeczy</Link>
            </div>
            <div className="navMenu">
                <Link to="/#">Start</Link>
                <ReactScroll/>
            </div>
        </div>
    )
}