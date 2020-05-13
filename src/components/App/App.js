import React from 'react';
import '../../scss/main.scss';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "../Home";
import SignUpPage from "../SignUp/SignUpPage";
import SignInPage from "../SignIn/SignInPage";
import HomeAfterLogin from "../HomeAfterLogin";
import LogOut from "../LogOut";


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
                <SignUpPage/>
            </Route>
            <Route path="/loginpage">
                <HomeAfterLogin/>
            </Route>
            <Route path="/logout">
                <LogOut/>
            </Route>
        </Switch>
      </Router>
  );
}

export default App;