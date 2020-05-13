import React from "react";
import {Link} from "react-router-dom";
import decoration from "../assets/Decoration.svg"
import ConstantHeaderAfterLogin from "./ConstantHeaderAfterLogin";

export default function HomeHeaderAfterLogin() {

    return (
        <>
            <div className="allSide">
                <div className="leftSide">
                </div>
                <div className="rightSide">
                    <ConstantHeaderAfterLogin/>
                    <div className="headerButton">
                        <h1>Zacznij pomagać!<br/>Oddaj niechciane rzeczy w zaufane ręce</h1>
                        <img src={decoration} alt="obrazek"/><br/>
                        <Link to="/login">ODDAJ RZECZY</Link>
                        <Link to="/#">ZORGANIZUJ ZBIÓRKĘ</Link>
                    </div>
                </div>

            </div>
        </>
    )
}
