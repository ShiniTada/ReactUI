import React from 'react'
import CallService from "../service/CallService";
import LocalStorageService from "../service/LocalStorageService";
import User from "../entity/User";

class BuyPopup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            found: undefined,
            toUserId: undefined
        };

        this.searchUser = this.searchUser.bind(this);
        this.buyCertificate = this.buyCertificate.bind(this);
    }

    render() {
        return (
            <div className="modal fade "
                 id={`buy${this.props.certificate.id}`}
                 tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content popup-color text-left">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.props.locale.buyCertificate}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <label>{this.props.locale.certificate}: </label>
                            <input type="text" id="title" className="form-control" disabled
                                   value={this.props.certificate.name}/>
                            <br/>
                            <label>{this.props.locale.price}: </label>
                            <input type="text" id="price" className="form-control" disabled
                                   value={this.props.certificate.price}/>
                            <br/>
                            <label>{this.props.locale.toUser}: </label>
                            <input type="text"
                                   name="search"
                                   id="userS"
                                   className="form-control "
                                   placeholder={this.props.locale.searchUser}
                                   onChange={this.searchUser}
                            />
                            <div className="row">
                                <div style={{width: '5%'}}></div>
                                {this.state.found === false &&
                                <div className="error-text">&times; {this.props.locale.notFound}</div>
                                }
                                {this.state.found === true &&
                                <div className="success-text">✓ {this.props.locale.found}</div>
                                }
                                <br/><br/>
                            </div>
                            <div className="row buttons">
                                <span style={{width: '5%'}}/>
                                {this.state.found === true &&
                                <button className="btn btn-primary" style={{width: '42%'}} data-dismiss="modal"
                                        onClick={() => {
                                            this.buyCertificate();
                                        }}>{this.props.locale.buttonBigBuy}
                                </button>
                                }
                                {this.state.found !== true &&
                                <button className="btn btn-primary" disabled style={{width: '42%'}}
                                        onClick={this.buyCertificate}>{this.props.locale.buttonBigBuy}
                                </button>}
                                <span style={{width: '6%'}}/>
                                <a className="btn btn-danger" style={{width: '42%'}} href="/certificates"
                                   role="button">{this.props.locale.buttonCancel}</a>
                                <span style={{width: '5%'}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    checkIsUser = () => {
        if (LocalStorageService.getUser() == null) {
            alert(this.props.locale.userIsLogOut);
            this.props.history.replace("/certificates");
            return false;
        }
        return true;
    };

    searchUser(e) {
        if (this.checkIsUser()) {
            let inputName = e.target.value;
            if (inputName === "") {
                this.setState({
                    found: undefined,
                    error: undefined,

                });
            } else {
                CallService.getUserByName(inputName)
                    .then(response => {
                        if (response.data.users[0] == null) {
                            this.setState({
                                found: false,
                                error: undefined
                            });
                        } else if (response.data.users[0].name == inputName) {
                            this.setState({
                                found: true,
                                toUserId: response.data.users[0].id,
                                error: undefined
                            });
                        } else {
                            this.setState({
                                found: false,
                                error: undefined
                            });
                        }
                    })
                    .catch(error => {
                        this.setState({
                            found: false,
                        });
                    });
            }
        }
    }

    buyCertificate() {
        if (this.checkIsUser()) {
            CallService.buyCertificate(this.props.certificate.id, this.state.toUserId)
                .then(response => {
                    let user = LocalStorageService.getUser();
                    CallService.getUserById(user.id)
                        .then(response => {
                            let name = response.data.name;
                            let balance = response.data.usersBalance;
                            LocalStorageService.setUser(new User(user.id, name, user.role, balance));
                            this.setState({
                                error: undefined,
                                found: undefined
                            });
                            document.getElementById("userS").value = "";
                            this.props.update();
                        })
                        .catch(error => {
                            this.handleException(error);
                        });
                })
                .catch(error => {
                    this.handleException(error);
                });
        }
    }

    handleException = (error) => {
        if (error.response !== undefined) {
            alert(this.props.locale.alreadyDeleted);
        } else {
            this.props.setError(error.message);
        }
    };


}

export default BuyPopup;
