import React from "react";
import {Link} from "react-router-dom";

import ReactScroll from "./ReactScroll";


export default function ConstantHeader() {

    return (
        <div className="constantHeader">
            <div className="logIn">
                <Link to="/login">Zaloguj</Link>
                <Link to="/register">Załóż konto</Link>
            </div>
            <div className="navMenu">
                <Link to="/#">Start</Link>
                <ReactScroll/>
            </div>
        </div>
    )
}