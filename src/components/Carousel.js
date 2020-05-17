import React, {useEffect, useState} from 'react'
import Form, { Page } from 'react-form-carousel'
import icon1 from '../assets/Icon-1.svg'
import icon2 from '../assets/Icon-4.svg'
import firebase from "firebase";

export default function Carousel(props) {

    const userAuth = props.user
    console.log(userAuth)

    const [bag, setBag] = useState('1')
    const [city, setCity] = useState('Poznań')
    const [typeGive, setTypeGive] = useState('')
    const [whoGive, setWhoGive] = useState([])

    const [addressInfo, setAddressInfo] = useState({street:"", postCode:"", city:"", phone:""})
    const [dateInfo, setDateInfo] = useState({date:"", hour:"", moreInfo:""})

    const [color, setColor] = useState('')

    const [readData, setReadData] = useState([])

    const style = {
        backgroundColor: color
    }

    const db = firebase.firestore()

    const handleSubmit = (props) => {
        db.collection(`${props}`).add({
            user: userAuth,
            IlośćWorków: bag,
            CoChceszOddać: typeGive,
            KomuChceszPomóc: whoGive,
            Adres: addressInfo,
            Data: dateInfo
        })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }
    useEffect( ( ) => {
        db.collection(`${userAuth}`).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
                setReadData( prev => ([...prev, doc.data()]))
            });
        });
    },[])

    console.log(readData)


    const handleBag = (event) => {
        setBag(event.target.value)
    }
    const handleCity = (event) => {
        setCity(event.target.value)
    }
    const handleTypeGive = (event) => {
        setTypeGive(event.target.value)
    }
    const handleWhoGive = (event) => {
        if (whoGive.includes(event.target.value)) {
            setWhoGive( whoGive.filter(el => el !== event.target.value))
            return
        }
        setWhoGive( [...whoGive, event.target.value])
        setColor("orange")
    }


    const handleAddressGive = ({target}) => {
        setAddressInfo( prev => ({ ...prev, [target.name]:target.value}))
    }
    const handleDateGive = ({target}) => {
        setDateInfo( prev => ({...prev, [target.name]:target.value}))
    }

    return (
            <main className="allStep">
            <Form onSubmit={ () => handleSubmit(userAuth)}>
                <Page>
                    <>
                        <div className="importantInformation">
                            <h1>Ważne!</h1>
                            <p>Uzupełnij szczegóły dotyczące Twoich rzeczy. Dzięki temu będziemy wiedzieć komu najlepiej je przekazać.</p>
                        </div>
                        <div className="firstStep step">
                            <p>Krok 1/4</p>
                            <h1>Zaznacz co chcesz oddać: </h1>
                            <input type="radio" value="ubrania, które nadają się do ponownego użycia" name="return" onClick={handleTypeGive}/>
                            <label>ubrania, które nadają się do ponownego użycia</label><br/>
                            <input type="radio" name="return" value="ubrania, do wyrzucenia" onClick={handleTypeGive}/>
                            <label>ubrania, do wyrzucenia</label><br/>
                            <input type="radio" name="return" value="zabawki" onClick={handleTypeGive}/>
                            <label>zabawki</label><br/>
                            <input type="radio" name="return" value="książki" onClick={handleTypeGive}/>
                            <label>książki</label><br/>
                            <input type="radio" name="return" value="inne" onClick={handleTypeGive}/>
                            <label>inne</label><br/>
                        </div>
                    </>
                </Page>
                <Page>
                    <>
                        <div className="importantInformation">
                            <h1>Ważne!</h1>
                            <p>Wszystkie rzeczy do oddania zapakuj w 60l worki. Dokładną instrukcję jak poprawnie spakować rzeczy znajdziesz TUTAJ.</p>
                        </div>
                        <div className="secondStep step">
                            <p>Krok 2/4</p>
                            <h1>Podaj liczbę 60l worków, w które spakowałeś/aś rzeczy: </h1>
                            <label>Liczba 60l worków:</label>
                            <select onChange={handleBag}>Liczba 60l worków:
                                <option>-- Wybierz --</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                    </>
                </Page>
                <Page>
                    <>
                        <div className="importantInformation">
                            <h1>Ważne!</h1>
                            <p>Jeśli wiesz komu chcesz pomóc, możesz wpisać nazwę tej organizacji w wyszukiwarce. Możesz też filtrować organizacje po ich lokalizacji bądź celu ich pomocy.</p>
                        </div>
                        <div className="thirdStep step">
                            <p>Krok 3/4</p>
                            <h1>Lokalizacja: </h1><br/>
                            <select onChange={handleCity}>
                                <option>Poznań</option>
                                <option>Warszawa</option>
                                <option>Kraków</option>
                                <option>Wrocław</option>
                                <option>Katowice</option>
                            </select>
                            <p>Komu chcesz pomóc?</p><br/>
                            <label style={whoGive.includes("dzieciom") ? style: {}}>dzieciom
                                <input type="checkbox" value="dzieciom" onClick={handleWhoGive} />
                            </label>
                            <label style={whoGive.includes("samotnym matkom") ? style: {}}>samotnym matkom
                                <input type="checkbox" value="samotnym matkom" onClick={handleWhoGive}/>
                            </label>
                            <label style={whoGive.includes("bezdomnym") ? style: {}}>bezdomnym
                                <input type="checkbox" value="bezdomnym" onClick={handleWhoGive}/>
                            </label><br/>
                            <label style={whoGive.includes("niepełnosprawnym") ? style: {}}>niepełnosprawnym
                                <input type="checkbox" value="niepełnosprawnym" onClick={handleWhoGive}/>
                            </label>
                            <label style={whoGive.includes("osobom starszym") ? style: {}}>osobom starszym
                                <input type="checkbox" value="osobom starszym" onClick={handleWhoGive}/>
                            </label>
                            <p>Wpisz nazwę konkretnej organizacji (opcjonalnie)</p>
                            <textarea></textarea>
                        </div>
                    </>
                </Page>
                <Page>
                    <>
                    <div className="importantInformation">
                        <h1>Ważne!</h1>
                        <p>Podaj adres oraz termin odbioru rzeczy.</p>
                    </div>
                    <div className="fourthStep step">
                        <p>Krok 4/4</p>
                        <h1>Podaj adres oraz termin odbioru rzecz przez kuriera</h1>
                        <div className="pickupAddress">
                            <div className="fitstColumn columnAd">
                                <h2>Adres odbioru:</h2>
                                <label>Ulica:</label>
                                <input type="text" onChange={handleAddressGive} value={addressInfo.street} name="street"/><br/>
                                <label>Miasto:</label>
                                <input type="text" onChange={handleAddressGive} value={addressInfo.city} name="city"/><br/>
                                <label>Kod pocztowy:</label>
                                <input type="text" onChange={handleAddressGive} value={addressInfo.postCode} name="postCode"/><br/>
                                <label>Numer telefonu:</label>
                                <input type="text" onChange={handleAddressGive} value={addressInfo.phone} name="phone"/><br/>
                            </div>
                            <div className="secondColumn columnAd">
                                <h2>Termin odbioru: </h2>
                                <label>Data:</label>
                                <input type="text" onChange={handleDateGive} value={dateInfo.data} name="date"/><br/>
                                <label>Godzina:</label>
                                <input type="text" onChange={handleDateGive} value={dateInfo.hour} name="hour"/><br/>
                                <label>Uwagi dla kuriera:</label>
                                <input type="text" onChange={handleDateGive} value={dateInfo.moreInfo} name="moreInfo"/><br/>
                            </div>
                        </div>
                    </div>
                    </>
                </Page>
                <Page>
                    <>
                        <div className="lastInpInfo">
                            <h1>Podsumowanie twojej darowizny</h1>
                        </div>
                    <div className="summaryInformation">
                        <div className="summary">
                            <img src={icon1} alt="icon"/><h2>Oddajesz:</h2>
                            <p>{bag} worki {typeGive}, {whoGive.join(',')}</p>
                            <img src={icon2} className="iconTwo" alt="icon"/><p>dla lokalizacji: {city}</p>
                        </div>
                        <div className="allColumnSummary">
                            <div className="fitstColumn columnAd">
                                <h2>Adres odbioru: </h2>
                                <p>Ulica: {addressInfo.street}</p>
                                <p>Miasto: {addressInfo.city}</p>
                                <p>Kod pocztowy: {addressInfo.postCode}</p>
                                <p>Numer telefonu: {addressInfo.phone}</p>
                            </div>
                            <div className="secondColumn columnAd">
                                <h2>Termin odbioru: </h2>
                                <p>Data: {dateInfo.date}</p>
                                <p>Godzina: {dateInfo.hour}</p>
                                <p>Uwagi dla kuriera: {dateInfo.moreInfo}</p>
                            </div>
                        </div>
                    </div>
                    </>
                </Page>
            </Form>
            </main>
    )
}


