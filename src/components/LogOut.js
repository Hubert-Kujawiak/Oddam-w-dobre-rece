import React from "react";
import decoration from "../assets/Decoration.svg"
import {Link} from "react-router-dom";
import ConstantHeader from "./ConstantHeader";

export default function LogOut() {

    return(
        <>
            <ConstantHeader/>
            <div className="logout">
                <h1>Wylogowanie nastąpiło<br/>pomyślnie!</h1>
                <img src={decoration} alt="decoration"/>
                <Link to='/'>Strona główna</Link>
            </div>
        </>
    )
}