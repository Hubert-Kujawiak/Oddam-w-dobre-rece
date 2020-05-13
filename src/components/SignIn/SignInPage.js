// import React from "react";
// import {Link} from "react-router-dom";
//
// export default function SignInPage() {
//
//     return(
//         <>
//             <div className="loginForm">
//                 <h1>Zaloguj się</h1>
//                 <form>
//                     <label>Email<br/>
//                         <input type="text"/><br/>
//                     </label>
//                     <label>Hasło<br/>
//                         <input type="password"/><br/>
//                     </label>
//                     <Link to="/signup">Załóż konto</Link>
//                     <button type="submit">Zaloguj</button>
//                 </form>
//             </div>
//         </>
//     )
// }


import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import decoration from "../../assets/Decoration.svg";
import ConstantHeader from "../ConstantHeader";

const SignInPage = () => (
    <div>
        <SignInForm />
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.LOGINPAGE);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <>
            <ConstantHeader/>
            <div className="loginForm">
                <h1>Zaloguj się</h1>
                <img src={decoration} alt="decoration"/>
            <form onSubmit={this.onSubmit}>
                <label>Email</label><br/>
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                /><br/>
                <label>Hasło</label><br/>
                <input
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                /><br/>
                <Link to="/register">Załóż konto</Link>
                <button disabled={isInvalid} type="submit">
                    Zaloguj się
                </button>
                {error && <p>{error.message}</p>}
            </form>
            </div>
            </>
        );
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };