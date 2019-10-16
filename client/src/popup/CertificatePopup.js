import React from 'react'
import SingleTag from "../certificates/SingleTag";

class CertificatePopup extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="modal fade "
                 id={`info${this.props.certificate.id}`}
                 tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content popup-color text-left">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.props.locale.certificate}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <label>{this.props.locale.title}: </label>
                            <input type="text" id="title" className="form-control" disabled
                                   value={this.props.certificate.name}/>
                            <br/>
                            <label>{this.props.locale.creationDate}: </label>
                            <input type="text" id="title" className="form-control" disabled
                                   value={this.props.certificate.creationDate}/>
                            <br/>
                            <label>{this.props.locale.price}: </label>
                            <input type="text" id="title" className="form-control" disabled
                                   value={this.props.certificate.price}/>
                            <br/>
                            <label>{this.props.locale.description}: </label>
                            <textarea className="form-control" id="description" rows="4" disabled
                                      value={this.props.certificate.description}></textarea>
                            <br/>
                            {this.props.certificate.tags.length !== 0 &&
                            <div>
                                <label>{this.props.locale.tags}: </label>
                                <div className="elem-tags text-left">
                                    {this.props.certificate.tags.map(thisTag => (
                                        <SingleTag tag={thisTag}
                                                   searchByTag={this.unsupportedSearch}
                                        />
                                    ))}
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    unsupportedSearch = () => {
    }
}

export default CertificatePopup
