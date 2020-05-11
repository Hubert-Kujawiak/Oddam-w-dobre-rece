import React from "react";
import decoration from "../assets/Decoration.svg"


export default function ContactForm() {

    return (
        <section id="contactForm">
            <div className="leftSideImage">
            </div>
            <div className="rightSideForm">
                <h1>Skontaktuj sie z nami</h1>
                <img src={decoration} alt="decoration"/>
                <form>
                    <label>Wpisz swoje imię
                        <input type="text" placeholder="Krzysztof"/>
                    </label>
                    <label>Wpisz swój email
                        <input type="text" placeholder="xyz@xyz.pl"/>
                    </label>
                    <label>Wpisz swoją wiadomość
                        <textarea placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."></textarea>
                    </label>
                    <button>Wyślij</button>
                </form>
            </div>
        </section>
    )
}