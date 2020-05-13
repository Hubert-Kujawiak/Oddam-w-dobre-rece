import React from 'react'
import ThreeColumns from "./ThreeColumns";
import GreetingSteps from "./GreetingSteps";
import AboutUs from "./AboutUs";
import WhoWeHelp from "./WhoWeHelp";
import ContactForm from "./ContactForm";
import Footer from "./Footer";
import HomeHeaderAfterLogin from "./HomeHeaderAfterLogin";

export default function HomeAfterLogin() {

    return (
        <>
            <HomeHeaderAfterLogin/>
            <ThreeColumns/>
            <GreetingSteps/>
            <AboutUs/>
            <WhoWeHelp/>
            <ContactForm/>
            <Footer/>
        </>
    )
}
