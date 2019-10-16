import React from "react";

const Switch = (props) => {
    return (
        <div className="dropdown" style={{width: '10%'}}>
            {props.mode == 1 &&
            <button className="btn btn-warning text dropdown-toggle" type="button"
                    data-toggle="dropdown">{props.locale.all}
                <span className="caret"></span></button>
            }
            {props.mode == 2 &&
            <button className="btn btn-warning text dropdown-toggle" type="button"
                    data-toggle="dropdown">{props.locale.myCertificates}
                <span className="caret"></span></button>
            }
            <ul className="dropdown-menu">
                <li className="text-left dropdown-button" onClick={() => props.switch(1)}>{props.locale.all}</li>
                <li className="text-left dropdown-button"
                    onClick={() => props.switch(2)}>{props.locale.myCertificates}</li>
            </ul>
        </div>
    );
};

export default Switch;

