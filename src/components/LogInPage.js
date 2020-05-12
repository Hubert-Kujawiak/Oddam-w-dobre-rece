import React from "react";
import ConstantHeader from "./ConstantHeader";
import decoration from "../assets/Decoration.svg"
import {Link} from "react-router-dom";

export default function LogInPage() {

    return(
        <>
            <ConstantHeader/>
            <div className="loginForm">
                <h1>Zaloguj się</h1>
                <img src={decoration} alt="decoration"/>
                <form>
                    <label>Email</label><br/>
                        <input type="text"/><br/>
                    <label>Hasło</label><br/>
                        <input type="password"/><br/>
                    <Link to="/register">Załóż konto</Link>
                    <button type="submit">Zaloguj</button>
                </form>
            </div>
        </>
    )
}