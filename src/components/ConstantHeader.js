import React from "react";
import {Link} from "react-router-dom";

import ReactScroll from "./ReactScroll";
import * as ROUTES from "../constants/routes";



export default function ConstantHeader() {

    return (
        <div className="constantHeader">
            <div className="logIn">
                <Link to={ROUTES.SIGN_IN}>Zaloguj</Link>
                <Link to={ROUTES.SIGN_UP}>Załóż konto</Link>
            </div>
            <div className="navMenu">
                <Link to="/#">Start</Link>
                <ReactScroll/>
            </div>
        </div>
    )
}