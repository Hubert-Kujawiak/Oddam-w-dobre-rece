import React from 'react';
import './scss/main.scss';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "./components/Home";
import LogInPage from "./components/LogInPage";
import RegisterPage from "./components/RegisterPage";


function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
            <Route path="/login">
                <LogInPage/>
            </Route>
            <Route path="/register">
                <RegisterPage/>
            </Route>
        </Switch>
      </Router>
  );
}

export default App;