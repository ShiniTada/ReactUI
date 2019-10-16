import React from 'react'
import CallService from "../service/CallService";
import LocalStorageService from "../service/LocalStorageService";
import User from "../entity/User"

class BalancePopup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            balanceError: "",
            error: undefined
        };

        this.validate = this.validate.bind(this);
        this.replenishBalance = this.replenishBalance.bind(this);
    }

    render() {
        return (
            <div className="modal fade "
                 id={`balance${this.props.user.id}`}
                 tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content popup-color text-left">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.props.locale.replenishBalance}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <label>{this.props.locale.yourBalance}: </label>
                            <input type="text" id="title" className="form-control" disabled
                                   value={this.props.user.balance}/>
                            <br/>
                            <label>{this.props.locale.inputAmount}: </label>
                            <input type="number" id="balance"
                                   className="form-control "
                            />
                            {this.state.balanceError !== "" &&
                            <div className="font-italic error-text">{this.state.balanceError}</div>
                            }
                            <br/>
                            {this.state.error !== undefined &&
                            <div className="alert alert-danger text-center ">
                                <span>{this.state.error}<br/></span>
                            </div>
                            }
                            <br/>
                            <div className="row buttons">
                                <span style={{width: '5%'}}/>
                                <button className="btn btn-primary" style={{width: '42%'}}
                                        onClick={() => {
                                            this.replenishBalance();
                                            this.props.update();
                                        }
                                        }>{this.props.locale.buttonSave}
                                </button>
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

    validate(addedBalance) {
        let locale = this.props.locale;
        let balanceError = "";
        if (addedBalance === "") {
            balanceError = locale.balanceIsRequired;
            document.getElementById('balance').style.borderColor = "red";
        } else if (Number(addedBalance) <= 0) {
            balanceError = locale.wrongBalance;
            document.getElementById('balance').style.borderColor = "red";
        } else {
            document.getElementById('balance').style.borderColor = "lightgray";
        }
        this.setState({
            balanceError: balanceError
        });
        return (balanceError === "");
    };

    checkIsUser = () => {
        if (LocalStorageService.getUser() == null) {
            alert(this.props.locale.userIsLogOut);
            this.props.history.replace("/certificates");
            return false;
        }
        return true;
    };

    replenishBalance() {
        if (this.checkIsUser()) {
            const addedBalance = document.getElementById("balance").value;
            this.setState({
                error: undefined,
                balanceError: undefined
            });
            if (this.validate(addedBalance)) {
                let newBalance = Number(this.props.user.balance) + Number(addedBalance);
                let fixedBalance = Number(newBalance).toFixed(2);
                CallService.setNewUserBalance(this.props.user.id, fixedBalance)
                    .then(response => {
                        let user = LocalStorageService.getUser();
                        LocalStorageService.setUser(new User(user.id, user.name, user.role, fixedBalance));
                        document.getElementById("balance").value = "";
                        document.getElementById('balance').style.borderColor = "lightgray";
                    })
                    .catch(error => {
                        if (error.response !== undefined) {
                            if (error.response.data.messages !== undefined) {
                                this.setState({
                                    error: error.response.data.messages[0],
                                });
                            }
                            this.setState({
                                error: error.response.data.message,
                            });
                        } else {
                            this.setState({
                                error: error.message,
                            });
                        }
                    });
            }
        }
    }


}

export default BalancePopup;
