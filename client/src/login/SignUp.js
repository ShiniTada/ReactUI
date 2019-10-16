import React from 'react';
import CallService from "../service/CallService";
import '../FormStyle.css';
import LocaleWrapper from "../localization/LocaleWrapper";
import LoginNavbar from "../navbar/LoginNavbar";
import Footer from "../footer/Footer";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginError: "",
            passwordError: "",
            confirmationError: "",
            errors: [],
            success: false,
            localeWrapper: new LocaleWrapper()
        };
        this.setBorderColor = this.setBorderColor.bind(this);
        this.validate = this.validate.bind(this);
        this.handleSignUpForm = this.handleSignUpForm.bind(this);
        this.setLanguage = this.setLanguage.bind(this);
        this.setConfirm = this.setConfirm.bind(this);
    }


    render() {
        let locale = this.state.localeWrapper.locale;
        return (
            <div>
                <LoginNavbar locale={locale}
                             setLanguage={this.setLanguage}/>
                <div className="big-wrap wrapper">
                    <div className="container text-center form-style">
                        <h4>{locale.signUp}</h4>
                        <br/>
                        <form onSubmit={this.handleSignUpForm}>

                            <div className="form-group">
                                <input type="text" id="username" className="form-control"
                                       onChange={() => this.setConfirm(true)} placeholder={locale.login}/>
                                {this.state.loginError !== "" &&
                                <div className="font-italic error-text">{this.state.loginError}</div>}
                            </div>
                            <div className="form-group">
                                <input type="password" id="password" className="form-control"
                                       onChange={() => this.setConfirm(true)} placeholder={locale.password}/>
                                {this.state.passwordError !== "" &&
                                <div className="font-italic error-text">{this.state.passwordError}</div>}
                            </div>
                            <div className="form-group">
                                <input type="password" id="confirm_password" className="form-control"
                                       onChange={() => this.setConfirm(true)} placeholder={locale.repeatPassword}/>
                                {this.state.confirmationError !== "" &&
                                <div className="font-italic error-text">{this.state.confirmationError}</div>}
                            </div>
                            {this.state.errors.length !== 0 &&
                            < div className="alert alert-danger">
                                {this.state.errors.map(thisError => (
                                    <span>{thisError}<br/></span>
                                ))
                                }
                            </div>
                            }
                            {this.state.success &&
                            <div className="alert alert-success" role="alert">
                                {locale.success}
                            </div>}
                            <div className="row">
                                <span style={{width: '5%'}}/>
                                <button className="btn btn-primary" style={{width: '42%'}}
                                        type="submit">{locale.signUp}</button>
                                <span style={{width: '6%'}}/>
                                <a className="btn btn-warning" style={{width: '42%'}} href="/certificates"
                                   role="button">{locale.buttonCancel}</a>
                                <span style={{width: '5%'}}/>
                            </div>
                        </form>
                        <br/>
                        <div className="footer">
                            <a href="/login"><u>{locale.logIn}</u></a>
                        </div>
                    </div>
                </div>
                <Footer locale={this.state.localeWrapper.locale}/>
            </div>
        );
    }

    setConfirm(isUpdate) {
        window.onbeforeunload = function () {
            if (isUpdate) {
                return 'You have unsaved data. Do you want to leave this page?';
            } else {
                window.onbeforeunload = null;
            }
        }
    }

    validate(username, password, confirmPassword) {
        let locale = this.state.localeWrapper.locale;
        let loginError = "";
        let passwordError = "";
        let confirmationError = "";
        if (username === "") {
            loginError = locale.loginIsRequired;
        } else if (username.length < 4 || username.length > 15) {
            loginError = locale.loginLength;
        }
        if (password === "") {
            passwordError = locale.passwordIsRequired;
        } else if (password.length < 4 || password.length > 15) {
            passwordError = locale.passwordLength;
        }
        if (password !== confirmPassword) {
            confirmationError = locale.passwordsDoNotMatch;
        }
        this.setState({
            success: false,
            loginError: loginError,
            passwordError: passwordError,
            confirmationError: confirmationError
        });
        return (loginError === "" && passwordError === "" && confirmationError === "");
    };

    setBorderColor(username, password, confirmPassword) {
        if (username.length < 4 || username.length > 15) {
            document.getElementById('username').style.borderColor = "red";
        } else {
            document.getElementById('username').style.borderColor = "lightgray";
        }

        if (password.length < 4 || password.length > 15) {
            document.getElementById('password').style.borderColor = "red";
        } else {
            document.getElementById('password').style.borderColor = "lightgray";
        }
        if (password !== confirmPassword) {
            document.getElementById('confirm_password').style.borderColor = "red";
        } else {
            document.getElementById('confirm_password').style.borderColor = "lightgray";
        }
    };

    handleSignUpForm = (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm_password').value;
        this.setBorderColor(username, password, confirmPassword);
        if (this.validate(username, password, confirmPassword)) {
            CallService.signUp(username, password)
                .then(response => {
                    this.setConfirm(false);
                    this.setState({
                        errors: [],
                        success: true
                    });
                })
                .catch(error => {
                    let errors = [];
                    if (error.response === undefined || error.response.data.messages === undefined) {
                        errors.push(error.message);
                    } else {
                        for (let iter = 0; iter < error.response.data.messages.length; iter++) {
                            if (error.response.data.messages[iter] === "User with the same name already exist") {
                                this.setState({
                                    loginError: this.state.localeWrapper.locale.userExist
                                });
                            } else {
                                errors.push(error.response.data.messages[iter]);
                            }
                        }
                    }
                    this.setState({
                        errors: errors,
                        success: false
                    });
                });
        }
    };

    setLanguage(languageCode) {
        this.state.localeWrapper.setLanguage(languageCode);
        this.setState({
            errors: []
        });
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm_password').value;
        this.setBorderColor(username, password, confirmPassword);
        this.validate(username, password, confirmPassword);
    }


}

export default SignUp;