import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import RegistrationForm from './components/sign-up';
import { checkLoggedIn } from './libs/auth';
import AuthenticationCallback from './components/auth-return';
import TopBar from './components/top-bar';
import Editor from './components/editor';
const whiteList = ["login", "signup"]
const App = () => {
  console.log(`***** pathname: ${window.location.pathname}`);
  console.log(`env:${JSON.stringify(process.env, null, '\t')}`)
  //await checkLoggedIn()
  const pathName = window.location.pathname.toLowerCase()
  
  checkLoggedIn()
  // if (pathName.length === 1 || !whiteList.includes(pathName.substr(1, pathName.length - 1))) {
  //   checkLoggedIn().then(_ => console.log('aaallll riiiight')).catch(_ => {
  //     window.location.href = "/login"
  //   })
  // }
  // else {
  //   console.log(`white listed`);

  // }
  return (
    <Router>
      <div>
        <TopBar />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Editor/>
          {/* <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup"><RegistrationForm /></Route>
          <Route path="/auth-return"><AuthenticationCallback /></Route> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
