import React from 'react'
import HomeHeader from "./HomeHeader";
import ThreeColumns from "./ThreeColumns";
import GreetingSteps from "./GreetingSteps";
import AboutUs from "./AboutUs";
import WhoWeHelp from "./WhoWeHelp";
import ContactForm from "./ContactForm";


export default function Home() {

    return (
        <>
            <HomeHeader/>
            <ThreeColumns/>
            <GreetingSteps/>
            <AboutUs/>
            <WhoWeHelp/>
            <ContactForm/>
        </>
    )
}
