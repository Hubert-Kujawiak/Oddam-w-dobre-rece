import React from "react";
import facebook from "../assets/Facebook.svg";
import instagram from "../assets/Instagram.svg";

export default function Footer() {

    return(
        <footer>
            <span>Copyright by Coders Lab</span>
            <a href="https://www.facebook.com/" target="_blank"><img src={facebook} alt="facebook"/></a>
            <a href="https://www.instagram.com/?hl=pl" target="blank"><img src={instagram} alt="instagram"/></a>
        </footer>
    )
}