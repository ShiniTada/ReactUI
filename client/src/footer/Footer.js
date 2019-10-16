import React from "react";

const Footer = (props) => {
    return (
        <div className="main-footer">
            {props.locale.footer}
        </div>
    );
};

export default Footer;