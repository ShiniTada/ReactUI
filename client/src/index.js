import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import UserPage from "./userpage/UserPage";
import Login from "./login/Login";
import SignUp from "./login/SignUp";
import AddCertificate from "./certificateacttions/AddCertificate";
import EditCertificate from "./certificateacttions/EditCertificate";
import './App.css';
import AccessIsDeniedPage from "./errorpage/AccessIsDeniedPage";


ReactDOM.render((
    <Router>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/certificates" component={UserPage}/>
        <Route path="/add" component={AddCertificate}/>
        <Route path="/edit" component={EditCertificate}/>
        <Route path="/error" component={AccessIsDeniedPage}/>
    </Router>

), document.getElementById('root'));

serviceWorker.register();