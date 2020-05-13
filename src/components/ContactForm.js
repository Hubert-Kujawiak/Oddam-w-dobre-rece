import React, {useState} from "react";
import decoration from "../assets/Decoration.svg"


export default function ContactForm() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleName = (event) => {
        setName(event.target.value)
    }
    const handleEmail = (event) => {
        setEmail(event.target.value)
    }
    const handleMessage = (event) => {
        setMessage(event.target.value)
    }

    console.log(name)
    console.log(email)
    console.log(message)

    const handleSubmit = () => {

        const form = {
            name: name,
            email: email,
            message: message
        };
        console.log(form)
        const API = "https://fer-api.coderslab.pl/v1/portfolio";
        fetch(`${API}/contact`, {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "Content-Type": "application/json"
            }
        })
        // .then(response => console.log("success")
    }

    return (
        <section id="contactForm">
            <div className="leftSideImage">
            </div>
            <div className="rightSideForm">
                <h1>Skontaktuj sie z nami</h1>
                <img src={decoration} alt="decoration"/>
                <form onSubmit={handleSubmit}>
                    <label>Wpisz swoje imię
                        <input type="text" placeholder="Krzysztof" onChange={handleName}/>
                    </label>
                    <label>Wpisz swój email
                        <input type="text" placeholder="xyz@xyz.pl" onChange={handleEmail}/>
                    </label>
                    <label>Wpisz swoją wiadomość
                        <textarea onChange={handleMessage} placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."></textarea>
                    </label>
                    <button type="submit">Wyślij</button>
                </form>
            </div>
        </section>
    )
}