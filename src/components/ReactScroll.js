import {Link} from "react-scroll";
import React from "react";

export default function ReactScroll() {

    return (
        <>
            <Link to="threeColumns" smooth={true} duration={1250}>O co chodzi?</Link>
            <Link to="aboutUs" smooth={true} duration={1250}>O nas</Link>
            <Link to="whoWeHelp" smooth={true} duration={1250}>Fundacja i organizacje</Link>
            <Link to="contactForm" smooth={true} duration={1250}>Kontakt</Link>
        </>
    )

}

