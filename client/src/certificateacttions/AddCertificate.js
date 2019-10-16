import React from 'react';
import OnEvent from 'react-onevent';
import '../App.css';
import Navbar from "../navbar/Navbar";
import CallService from "../service/CallService";
import Certificate from "../entity/Certificate";
import LocaleWrapper from "../localization/LocaleWrapper";
import LocalStorageService from "../service/LocalStorageService";
import Footer from "../footer/Footer";

class AddCertificate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tagsInputValue: '',
            tags: [],
            nameError: "",
            descriptionError: "",
            priceError: "",
            errors: [],
            user: undefined,
            localeWrapper: new LocaleWrapper()
        };

        this.setBorderColor = this.setBorderColor.bind(this);
        this.validate = this.validate.bind(this);
        this.handleAddForm = this.handleAddForm.bind(this);
        this.setConfirm = this.setConfirm.bind(this);
    }

    componentWillMount() {
        if (LocalStorageService.getUser() === null) {
            this.props.history.replace("/error");
        } else {
            if (LocalStorageService.getUser().role === "ROLE_ADMIN") {
                this.setState({
                    user: LocalStorageService.getUser()
                })
            } else {
                this.props.history.replace("/error");
            }
        }
    }

    render() {
        let locale = this.state.localeWrapper.locale;
        return (
            <div>
                <Navbar user={this.state.user}
                        locale={locale}
                        history={this.props.history}/>
                <div className="big-wrap wrapper">
                    <div className="container form-add-style">
                        <div>
                            <h4 className="text-center">{locale.addCertificate}</h4>
                            <div className="form-group">
                                <label htmlFor="title">{locale.title}</label>
                                <input type="text" id="title"  onChange={() => this.setConfirm(true)} className="form-control"/>
                                {this.state.nameError !== "" &&
                                <div className="font-italic error-text">{this.state.nameError}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">{locale.description}</label>
                                <textarea className="form-control" id="description" rows="4"
                                          onChange={() => this.setConfirm(true)}></textarea>
                                {this.state.descriptionError !== "" &&
                                <div className="font-italic error-text">{this.state.descriptionError}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">{locale.price}</label>
                                <input type="number" id="price" onChange={() => this.setConfirm(true)} className="form-control"/>
                                {this.state.priceError !== "" &&
                                <div className="font-italic error-text">{this.state.priceError}</div>}
                            </div>
                        </div>
                        <br/>

                        <div className="myTags">
                            <label htmlFor="tagInput">{locale.tags}</label>
                            <OnEvent enter={(e) => this.addTag(e.target.value)}>
                                <input value={this.state.tagsInputValue} id="tagInput" onChange={(e) => {
                                    this.updateTagValue(e.target.value);
                                }} type="text" className="form-control" placeholder={locale.inputTag}/>
                            </OnEvent>
                            {this.state.tagError !== "" &&
                            <div className="font-italic error-text">{this.state.tagError}</div>}
                            <div>
                                {this.state.tags && this.state.tags.map(thisTag => (

                                    <div className="btn navbar-color" style={{margin: '10px 5px 0px'}}>
                                        <span>{thisTag} </span>
                                        <button type="button" className="close" onClick={() => this.removeTag(thisTag)}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <br/>
                        {this.state.errors.length !== 0 &&
                        < div className="alert alert-danger text-center ">
                            {this.state.errors.map(thisError => (
                                <span>{thisError}<br/></span>
                            ))
                            }
                            <br/>
                        </div>
                        }
                        <div className="row buttons">
                            <span style={{width: '5%'}}/>
                            <button className="btn btn-success" style={{width: '42%'}}
                                    onClick={this.handleAddForm}>{locale.buttonAdd}
                            </button>
                            <span style={{width: '6%'}}/>
                            <a className="btn btn-danger" style={{width: '42%'}} href="/certificates"
                               role="button">{locale.buttonCancel}</a>
                            <span style={{width: '5%'}}/>
                        </div>
                    </div>
                </div>
                <Footer locale={this.state.localeWrapper.locale}/>
            </div>
        );
    }

    setConfirm(isUpdate) {
        window.onbeforeunload = function(){
            if(isUpdate) {
                return "You have unsaved data. Do you want to leave this page?";
            }else{
                window.onbeforeunload = null;
            }
        }
    }

    addTag = (tag) => {

        if (tag === '' || tag.length < 3 || tag.length > 15) {
            return;
        }
        tag = tag.trim();

        if (!(this.state.tags.indexOf(tag) > -1)) {
            let tags = this.state.tags.concat([tag]);
            this.updateTags(tags);
        }
        this.updateTagValue('');
    };

    updateTagValue = (value) => {
        this.setState({
            tagsInputValue: value
        });
        this.setConfirm(true);
        if (value.length < 3 || value.length > 15) {
            if(value.length === 0) {
                document.getElementById('tagInput').style.borderColor = "lightgray";
                this.setState({
                    tagError: ""
                });
            } else {
                document.getElementById('tagInput').style.borderColor = "red";
                this.setState({
                    tagError: this.state.localeWrapper.locale.tagLength
                });
            }
        } else {
            document.getElementById('tagInput').style.borderColor = "lightgray";
            this.setState({
                tagError: ""
            });
        }
    };

    removeTag = (removeTag) => {
        let tags = this.state.tags.filter((tag) => tag !== removeTag);
        this.updateTags(tags);
        this.setConfirm(true);
    };

    updateTags = (tags) => {
        this.setState({
            tags: tags
        });
    };


    validate(name, description, price) {
        let locale = this.state.localeWrapper.locale;
        let nameError = "";
        let descriptionError = "";
        let priceError = "";
        if (name === "") {
            nameError = locale.titleIsRequired;
        } else if (name.length < 3 || name.length > 30) {
            nameError = locale.titleLength;
        }
        if (description === "") {
            descriptionError = locale.descriptionIsRequired;
        } else if (description.length < 3 || description.length > 250) {
            descriptionError = locale.descriptionLength;
        }
        if (price === "") {
            priceError = locale.priceIsRequired;
        } else if (Number(price) <= 0) {
            priceError = locale.wrongPrice;
        }
        this.setState({
            nameError: nameError,
            descriptionError: descriptionError,
            priceError: priceError
        });
        return (nameError === "" && descriptionError === "" && priceError === "");
    };

    setBorderColor(name, description, price) {
        if (name.length < 3 || name.length > 30) {
            document.getElementById('title').style.borderColor = "red";
        } else {
            document.getElementById('title').style.borderColor = "lightgray";
        }
        if (description.length < 3 || description.length > 250) {
            document.getElementById('description').style.borderColor = "red";
        } else {
            document.getElementById('description').style.borderColor = "lightgray";
        }
        if (price === "" || (Number(price) <= 0)) {
            document.getElementById('price').style.borderColor = "red";
        } else {
            document.getElementById('price').style.borderColor = "lightgray";
        }
    };

    checkIsAdmin = () => {
        if (LocalStorageService.getUser() == null || LocalStorageService.getUser().role !== "ROLE_ADMIN") {
            let errors = [];
            errors.push(this.state.localeWrapper.locale.adminIsLogOut);
            this.setState({
                errors: errors,
            });
            return false;
        }
        return true;
    };

    handleAddForm(e) {
        if (this.checkIsAdmin()) {
            e.preventDefault();
            const name = document.getElementById("title").value;
            const description = document.getElementById("description").value;
            let price = document.getElementById("price").value;
            this.setState({
                errors: []
            });
            this.setBorderColor(name, description, price);
            if (this.validate(name, description, price)) {
                let errors = [];
                let certificate = new Certificate(undefined, name, description, price, undefined, this.state.tags);
                CallService.addCertificate(certificate)
                    .then(response => {
                       this.setConfirm(false);
                        this.props.history.replace("/certificates");
                    })
                    .catch(error => {
                        if (error.response === undefined || error.response.data.messages === undefined) {
                            errors.push(error.message);
                        } else {
                            for (let iter = 0; iter < error.response.data.messages.length; iter++) {
                                errors.push(error.response.data.messages[iter]);
                            }
                        }
                        this.setState({
                            errors: errors,
                        });
                    });
            }
        }
    };

}


export default AddCertificate;
