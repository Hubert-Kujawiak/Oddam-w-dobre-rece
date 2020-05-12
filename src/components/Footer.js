import React from "react";
import facebook from "../assets/Facebook.svg";
import instagram from "../assets/Instagram.svg";

export default function Footer() {

    return(
        <footer>
            <span>Copyright by Coders Lab</span>
            <a href="" target="blank"><img src={facebook} alt="facebook"/></a>
            <img src={instagram} alt="instagram"/>
        </footer>
    )
}