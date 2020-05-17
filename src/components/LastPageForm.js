import React from "react";
import decoration from "../assets/Decoration.svg"

const LastPageForm = () => {

    return (
        <div className="lastPageForm">
            <div className="headerAndImage">
                <h1>Dziękujemy za przesłanie formularza.<br/>Na maila prześlemy wszelkie informacje o odbiorze.</h1>
                <img src={decoration}/>
            </div>
        </div>
    )
}

export default LastPageForm