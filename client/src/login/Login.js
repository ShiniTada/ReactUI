import React from 'react';
import AuthHelper from "../service/AuthHelper";
import CallService from "../service/CallService";
import '../FormStyle.css';
import LocaleWrapper from "../localization/LocaleWrapper";
import LoginNavbar from "../navbar/LoginNavbar";
import Footer from "../footer/Footer";
import LocalStorageService from "../service/LocalStorageService";
import jwt_decode from "jwt-decode";
import User from "../entity/User";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginError: "",
            passwordError: "",
            errors: [],
            localeWrapper: new LocaleWrapper()
        };
        this.validate = this.validate.bind(this);
        this.handleLoginForm = this.handleLoginForm.bind(this);
        this.setLanguage = this.setLanguage.bind(this);
    }

    render() {
        let locale = this.state.localeWrapper.locale;
        return (
            <div>
                <LoginNavbar locale={locale}
                             setLanguage={this.setLanguage}/>
                <div className="big-wrap wrapper">
                    <div className="container text-center form-style">
                        <h4>{locale.logIn}</h4>
                        <br/>
                        <form onSubmit={this.handleLoginForm}>

                            <div className="form-group">
                                <input type="text" id="username" className="form-control" placeholder={locale.login}/>
                                {this.state.loginError !== "" &&
                                <div className="font-italic error-text">{this.state.loginError}</div>}
                            </div>
                            <div className="form-group">
                                <input type="password" id="password" className="form-control"
                                       placeholder={locale.password}/>
                                {this.state.passwordError !== "" &&
                                <div className="font-italic error-text">{this.state.passwordError}</div>}
                            </div>
                            {this.state.errors.length !== 0 &&
                            < div className="alert alert-danger">
                                {this.state.errors.map(thisError => (
                                    <span>{thisError}<br/></span>
                                ))
                                }
                            </div>
                            }
                            <div className="row">
                                <span style={{width: '5%'}}/>
                                <button className="btn btn-primary" style={{width: '42%'}}
                                        type="submit">{locale.logIn}</button>
                                <span style={{width: '6%'}}/>
                                <a className="btn btn-warning" style={{width: '42%'}} href="/certificates"
                                   role="button">{locale.buttonCancel}</a>
                                <span style={{width: '5%'}}/>
                            </div>
                        </form>
                        <br/>
                        <div className="footer">
                            <a href="/signup"><u>{locale.signUp}</u></a>
                        </div>
                    </div>
                </div>
                <Footer locale={this.state.localeWrapper.locale}/>
            </div>
        );
    }

    validate(username, password) {
        let locale = this.state.localeWrapper.locale;
        let loginError = "";
        let passwordError = "";
        if (username === "") {
            loginError = locale.loginIsRequired;
            document.getElementById('username').style.borderColor = "red";
        } else {
            document.getElementById('username').style.borderColor = "lightgray";
        }
        if (password === "") {
            passwordError = locale.passwordIsRequired;
            document.getElementById('password').style.borderColor = "red";
        } else {
            document.getElementById('password').style.borderColor = "lightgray";
        }
        this.setState({
            loginError: loginError,
            passwordError: passwordError
        });
        return (loginError === "" && passwordError === "");
    };

    handleLoginForm = (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (AuthHelper.isLoggedIn()) {
            let errors = [];
            errors.push("User already logged in. Before another log in you should log out");
            this.setState({
                errors: errors
            });
        } else {
            this.setState({
                errors: []
            });
            if (this.validate(username, password)) {
                CallService.logIn(username, password)
                    .then(response => {
                        LocalStorageService.setToken(response.data.access_token);
                        LocalStorageService.setRefreshToken(response.data.refresh_token);
                        let tokenInfo = jwt_decode(response.data.access_token);
                        let userId;
                        let balance;
                        CallService.getUserByName(tokenInfo.user_name)
                            .then(resp => {
                                userId = resp.data.users[0].id;
                                CallService.getUserById(userId)
                                    .then(balanceResponse => {
                                        balance = balanceResponse.data.usersBalance;
                                        LocalStorageService.setUser(new User(userId, tokenInfo.user_name, tokenInfo.authorities[0], balance));
                                        this.props.history.replace("/certificates");
                                    })
                                    .catch(error => {
                                        this.handleExceptions(error);
                                    });
                            })
                            .catch(error => {
                                this.handleExceptions(error);
                            });
                    })
                    .catch(error => {
                        this.handleExceptions(error);
                    });
            }
        }
    };

    handleExceptions = (error) => {
        let errors = [];
        if (error.response === undefined || error.response.data.messages === undefined) {
            if (error.message === "Network Error") {
                errors.push(this.state.localeWrapper.locale.networkError)
            } else if (error.message === "Request failed with status code 400") {
                errors.push(this.state.localeWrapper.locale.wrongCredentials);
            } else {
                errors.push(error.message);
            }
        } else {
            for (let iter = 0; iter < error.response.data.messages.length; iter++) {
                errors.push(error.response.data.messages[iter]);
            }
        }
        this.setState({
            errors: errors
        });
    };

    setLanguage(languageCode) {
        this.state.localeWrapper.setLanguage(languageCode);
        this.setState({
            errors: []
        });
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        this.validate(username, password);
    }

}

export default Login;