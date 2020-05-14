import React from 'react'
import ConstantHeaderAfterLogin from "./ConstantHeaderAfterLogin";
import decoration from "../assets/Decoration.svg";
import ContactForm from "./ContactForm";
import GiveBackForm from "./GiveBackForm";
import Carousel from "./Carousel";

export default function GiveBack() {


    return (
        <>
        <div className="allSideForm">
            <div className="leftSideForm">
            </div>
            <div className="rightSideForm">
                <ConstantHeaderAfterLogin/>
                <div className="headerButtonForm">
                    <h1>Oddaj rzeczy, których już nie chcesz<br/>POTRZEBUJĄCYM</h1>
                    <img src={decoration} alt="obrazek"/><br/>
                    <h2>Wystarczą 4 proste kroki</h2>
                    <div className="rombFlex">
                        <div className="firstRomb romb">
                            <h3>1</h3>
                            <p>Wybierz rzeczy</p>
                        </div>
                        <div className="firstRomb romb">
                            <h3>2</h3>
                            <p>Spakuj je w worki</p>
                        </div>
                        <div className="firstRomb romb">
                            <h3>3</h3>
                            <p>Wybierz fundację</p>
                        </div>
                        <div className="firstRomb romb">
                            <h3>4</h3>
                            <p>Zamów kuriera</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="importantInformation">
            <h1>Ważne!</h1>
            <p>Uzupełnij szczegóły dotyczące Twoich rzeczy. Dzięki temu będziemy wiedzieć komu najlepiej je przekazać.</p>
        </div>
        <Carousel/>
        <ContactForm/>
        </>
    )

}