import React, {useState } from 'react'
import Form, { Page } from 'react-form-carousel'

export default function Carousel() {

    const [name, setName] = useState('1')
    console.log(name)

    const handleSubmit = () => {

    }

    const handleWorek = (event) => {
        setName(event.target.value)
    }

    return (
        <div className="giveBackForm">
            <Form onSubmit={handleSubmit}>
                <Page>
                    <>
                        <p>Krok 1/4</p>
                        <h1>Zaznacz co chcesz oddać: </h1>
                        <label>ubrania, które nadają się do ponownego użycia</label><br/>
                        <input type="radio"/><br/>
                        <label>ubrania, do wyrzucenia</label><br/>
                        <input type="radio"/><br/>
                        <label>zabawki</label><br/>
                        <input type="radio"/><br/>
                        <label>książki</label><br/>
                        <input type="radio"/><br/>
                        <label>inne</label><br/>
                        <input type="radio"/><br/>
                    </>
                </Page>
                <Page>
                    <>
                        <p>Krok 2/4</p>
                        <h1>Podaj liczbę 60l worków, w które spakowałeś/aś rzeczy: </h1>
                        <select onChange={handleWorek}>Liczba 60l worków:
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </>
                </Page>
                <Page>
                    <>
                        <p>Krok 3/4</p>
                        <label>Lokalizacja: </label><br/>
                        <select>
                            <option>Poznań</option>
                            <option>Warszawa</option>
                            <option>Kraków</option>
                            <option>Wrocław</option>
                            <option>Katowice</option>
                        </select>
                        <label>Komu chcesz pomóc?</label><br/>
                        <input type="checkbox"/>
                        <input type="checkbox"/>
                        <input type="checkbox"/>
                        <input type="checkbox"/>
                        <input type="checkbox"/>
                        <label>Wpisz nazwę konkretnej organizacji (opcjonalnie)</label>
                        <input type="text"/>
                    </>
                </Page>
                <Page>

                </Page>
            </Form>
        </div>
    )
}


