import React from 'react';
import '../../scss/main.scss';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "../Home";
import LogInPage from "../LogInPage";
import SignUpPage from "../SignUp/SignUpPage";
import SignInPage from "../SignIn/SignInPage";


function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
            <Route path="/login">
                <SignInPage/>
            </Route>
            <Route path="/register">
                {/*<RegisterPage/>*/}
                <SignUpPage/>
            </Route>
        </Switch>
      </Router>
  );
}

export default App;