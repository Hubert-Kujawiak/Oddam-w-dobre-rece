import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';


import { withFirebase } from '../Firebase';


import * as ROUTES from '../../constants/routes';
import ConstantHeader from "../ConstantHeader";
import decoration from "../../assets/Decoration.svg";

const SignUpPage = () => (
    <div>
        <SignUpForm />
    </div>
);
const INITIAL_STATE = {
    // username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const {email, passwordOne } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {

        const {
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === ''

        return (
            <>
            <ConstantHeader/>
            <div className="registerForm">
                <h1>Załóż konto</h1>
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
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                /><br/>
                <label>Powtórz hasło</label><br/>
                <input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                />
                <Link to="/login">Zaloguj się</Link>
                <button disabled={isInvalid} type="submit">
                    Załóż konto
                </button>
                {error && <p>{error.message}</p>}
            </form>
            </div>
            </>
        );
    }
}

// const SignUpLink = () => (
//     <p>
//         Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
//     </p>
// );

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm};