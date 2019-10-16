import React from "react";
import AuthHelper from "../service/AuthHelper";
import BalancePopup from "../popup/BalancePopup";

const PublicNavbar = (props) => {
    return (
        <nav className="navbar navbar-inverse navbar-color">
            <div className="container-fluid">
                <div className="navbar-header">
                    {props.user !== undefined && props.user.role === "ROLE_ADMIN" &&
                    <a href="/add" className="btn"><b>{props.locale.addNewCertificate}</b></a>
                    }
                </div>

                {props.user !== undefined &&
                <div className="navbar-right">
                    <div className="row">
                        <div className="dropdown">
                            <button className="btn text dropdown-toggle" type="button" data-toggle="dropdown">
                                <b>{props.user.name}</b>
                                <span className="caret"></span></button>
                            <ul className="dropdown-menu">
                                <li className="text-left dropdown-top-button"
                                    data-toggle="modal" data-target={`#balance${props.user.id}`}

                                ><b> {props.locale.balance}: {props.user.balance}</b></li>

                                <li className="text-left dropdown-top-button"
                                    onClick={() => {
                                        AuthHelper.logOut();
                                        props.history.replace("/login");
                                    }}><b> {props.locale.logOut}</b></li>
                            </ul>
                            <BalancePopup locale={props.locale}
                                          user={props.user}
                                          update={props.update}
                                          history={props.history}/>
                        </div>
                        <a className="btn" onClick={() => {
                            props.setLanguage("en")
                        }}><b>En</b></a>
                        <a className="btn" onClick={() => {
                            props.setLanguage("ru")
                        }}><b>Ru</b></a>
                    </div>
                </div>
                }

                {props.user === undefined &&
                <div className="navbar-right">
                    <div className="row">
                        <a className="btn" onClick={() => {
                            props.setLanguage("en")
                        }}><b>En</b></a>
                        <a className="btn" onClick={() => {
                            props.setLanguage("ru")
                        }}><b>Ru</b></a>
                        <a href="/signup" className="btn"><b> {props.locale.signUp}</b></a>
                        <a href="/login" className="btn"><b> {props.locale.logIn}</b></a>
                    </div>
                </div>
                }
            </div>
        </nav>

    );
};

export default PublicNavbar;