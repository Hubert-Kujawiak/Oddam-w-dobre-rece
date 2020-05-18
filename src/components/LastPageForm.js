import React,{useEffect} from "react";
import decoration from "../assets/Decoration.svg"
import { useHistory } from 'react-router-dom'

const LastPageForm = () => {

    const history = useHistory();
    useEffect(() => {
        const timeout = setTimeout(() => {
            history.push("/")
        }, 3000)
        return () => clearTimeout(timeout)
    })

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