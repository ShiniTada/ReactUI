import React from "react";
import SingleTag from "./SingleTag";

const SingleCertificate = (props) => {
    return (
        <div className="col-xs-2 elem">
            <div className="elem-head settings text-left" data-toggle="modal"
                 data-target={`#info${props.certificate.id}`}>
                <span className="head-text"> {props.certificate.name}</span>
                <br></br>
                {props.certificate.creationDate}

            </div>

            < div className="elem-tags text-left">
                {props.certificate.tags.length !== 0 && props.certificate.tags.map(thisTag => (
                    <SingleTag tag={thisTag}
                               searchByTag={props.searchByTag}
                    />
                ))}
            </div>

            <div className="elem-text">
                <span className="text">{props.certificate.description}</span>
            </div>

            <div className="settings">
                {props.user !== undefined && props.user.role === "ROLE_ADMIN" &&
                <div>
                    <button type="button"
                            className="btn btn-warning inside-button-margin btn-sm "
                            onClick={() => props.editCertificate(props.certificate)}
                    >{props.locale.buttonEdit}
                    </button>

                    <button type="button"
                            className="btn btn-danger inside-button-margin inside-right-button-margin btn-sm"
                            data-toggle="modal" data-target={`#delete${props.certificate.id}`}
                    >{props.locale.buttonDelete}
                    </button>
                    <button type="button"
                            className="btn btn-success margin-left inside-button-margin btn-sm"
                            data-toggle="modal" data-target={`#buy${props.certificate.id}`}
                    >{props.locale.buttonBuy}
                    </button>
                    {props.certificate.price} $
                </div>
                }
                {props.user !== undefined && props.user.role === "ROLE_USER" &&
                <div>
                    <button type="button"
                            className="btn btn-success margin-left inside-button-margin btn-sm"
                            data-toggle="modal" data-target={`#buy${props.certificate.id}`}
                    >{props.locale.buttonBuy}
                    </button>
                    {props.certificate.price} $
                </div>
                }
                {props.user === undefined &&
                <span>
                {props.certificate.price} $
                    </span>
                }
            </div>
        </div>
    );
};

export default SingleCertificate;