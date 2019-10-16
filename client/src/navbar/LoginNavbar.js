import React from "react";

const LoginNavbar = (props) => {
    return (
        <nav className="navbar navbar-inverse navbar-color">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a href="/certificates" className="btn"><b>{props.locale.certificates}</b></a>
                </div>
                {props.user !== undefined &&
                <div className="navbar-right">
                    <div className="row">
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
                    </div>
                </div>
                }
            </div>
        </nav>

    );
};

export default LoginNavbar;