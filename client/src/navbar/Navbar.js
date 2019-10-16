import React from "react";
import AuthHelper from "../service/AuthHelper";

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-inverse navbar-color">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a href="/certificates" className="btn"><b>{props.locale.certificates}</b></a>
                </div>

                {props.user !== undefined &&
                <div className="navbar-right">
                    <div className="dropdown">
                        <button className="btn text dropdown-toggle" type="button" data-toggle="dropdown">
                            <b>{props.user.name}</b>
                            <span className="caret"></span></button>
                        <ul className="dropdown-menu">
                            <li className="text-left dropdown-top-button" onClick={() => {
                                AuthHelper.logOut();
                                props.history.replace("/login");
                            }}><b> {props.locale.logOut}</b></li>
                        </ul>
                    </div>
                </div>
                }

                {props.user === undefined &&
                <div className="navbar-right">
                    <div className="row">
                        <a href="/signup" className="btn"><b> {props.locale.signUp}</b></a>
                        <a href="/login" className="btn"><b> {props.locale.logIn}</b></a>
                    </div>
                </div>
                }
            </div>
        </nav>

    );
};

export default Navbar;