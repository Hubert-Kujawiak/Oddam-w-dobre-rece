import React from "react";
import {Link} from "react-router-dom";
import decoration from "../assets/Decoration.svg"
import ConstantHeader from "./ConstantHeader";
import ConstantHeaderAfterLogin from "./ConstantHeaderAfterLogin";
import {withFirebase} from "./Firebase";


function HomeHeader({ firebase }) {

    const isUser = firebase.getCurrentUser()
    return (
        <>
        <div className="allSide">
            <div className="leftSide">
            </div>
            <div className="rightSide">
                {isUser ? <ConstantHeaderAfterLogin/> :<ConstantHeader/> }
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
export default withFirebase(HomeHeader)