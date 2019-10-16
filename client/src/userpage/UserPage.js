import React from 'react';
import * as moment from "moment";
import Search from "./Search";
import Certificates from "../certificates/Certificates";
import CallService from "../service/CallService";
import Pagination from "./Pagination";
import PublicNavbar from "../navbar/PublicNavbar";
import LocalStorageService from "../service/LocalStorageService";
import Certificate from "../entity/Certificate";
import Switch from "./Switch";
import LocaleWrapper from "../localization/LocaleWrapper";
import Footer from "../footer/Footer";

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sorting: undefined,
            searchQuery: "",
            certificates: [],
            errors: [],
            mode: 1,
            localeWrapper: new LocaleWrapper()
        };

        this.getListCertificates = this.getListCertificates.bind(this);
        this.searchByTag = this.searchByTag.bind(this);
        this.editCertificate = this.editCertificate.bind(this);
        this.deleteCertificate = this.deleteCertificate.bind(this);
        this.searchCertificates = this.searchCertificates.bind(this);
        this.update = this.update.bind(this);
        this.paginate = this.paginate.bind(this);
        this.switch = this.switch.bind(this);
        this.setLanguage = this.setLanguage.bind(this);
        this.setError = this.setError.bind(this);

        this.update();
    }


    render() {
        let user = LocalStorageService.getUser();
        if (user == null) {
            user = undefined;
        }
        return (
            <div>
                <PublicNavbar user={user}
                              locale={this.state.localeWrapper.locale}
                              setLanguage={this.setLanguage}
                              history={this.props.history}
                              update={this.update}/>
                <div className="big-wrap wrapper">
                    <div className="container text-center">
                        {this.state.errors.length !== 0 && this.state.errors.map(thisError => (
                            <div><br/>
                                <div className="alert alert-danger alert-dismissible text-left">
                                    <a className="close" data-dismiss="alert" aria-label="close" onClick={() => {
                                        let errors = this.state.errors.filter((err) => err !== thisError);
                                        this.setState({
                                            errors: errors
                                        });
                                    }}>&times;</a>
                                    {thisError}<br/>
                                </div>
                            </div>))
                        }
                        {user !== undefined &&
                        <div className="row">
                            <div style={{width: '10%'}}></div>
                            <Switch mode={this.state.mode}
                                    switch={this.switch}
                                    locale={this.state.localeWrapper.locale} style={{width: '10%'}}/>
                            <div style={{width: '50%'}}></div>
                            {LocalStorageService.getSwitchMode() == 1 &&
                            <Search searchCertificates={this.searchCertificates}
                                    locale={this.state.localeWrapper.locale}
                            />
                            }
                        </div>
                        }
                        {user === undefined &&
                        <Search searchCertificates={this.searchCertificates}
                                locale={this.state.localeWrapper.locale}
                        />
                        }
                        <div className="wrapper">
                            <div className="container text-center">
                                <Certificates certificates={this.state.certificates}
                                              user={user}
                                              searchByTag={this.searchByTag}
                                              editCertificate={this.editCertificate}
                                              deleteCertificate={this.deleteCertificate}
                                              locale={this.state.localeWrapper.locale}
                                              update={this.update}
                                              setError={this.setError}
                                              history={this.props.history}
                                />
                                <Pagination pageNumber={this.state.pageNumber}
                                            maxResults={this.state.maxResults}
                                            paginate={this.paginate}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer locale={this.state.localeWrapper.locale}/>
            </div>
        );
    }

    searchCertificates(e) {
        e.preventDefault();
        const queryValue = document.getElementById("query").value;
        this.setState({
            searchQuery: queryValue
        });
        this.update(queryValue, 1);
    }

    searchByTag(tag) {
        if (LocalStorageService.getSwitchMode() == 1) {
            let query = document.getElementById("query");
            if (query.value.indexOf(`tags=${tag}`) !== -1 || query.value.indexOf(`,${tag}`) !== -1) {
                return;
            }

            let haveTag = query.value.indexOf("tags");
            if (haveTag !== -1) {
                let oldQuery = query.value;
                let newTagString = `${tag},`;
                let position = query.value.indexOf("tags=") + 5;
                query.value = [oldQuery.slice(0, position), newTagString, oldQuery.slice(position)].join('');
            } else {
                if (query.value !== "") {
                    query.value += '&';
                }
                query.value += `tags=${tag}`;
            }
            this.setState({
                searchQuery: query.value
            });
            this.update(query.value, 1);
        }
    }

    update(query, pageNumber, maxResults, mode = undefined) {
        if (query === undefined) {
            query = this.state.searchQuery;
        }
        if (pageNumber === undefined) {
            if (LocalStorageService.getPageNumber() != null) {
                pageNumber = LocalStorageService.getPageNumber();
            } else {
                pageNumber = 1;
            }
        }
        LocalStorageService.setPageNumber(pageNumber);

        if (maxResults === undefined) {
            if (LocalStorageService.getMaxResults() !== null) {
                maxResults = LocalStorageService.getMaxResults();
            } else {
                maxResults = 6;
            }
        }
        LocalStorageService.setMaxResults(maxResults);

        if (mode === undefined) {
            if (LocalStorageService.getSwitchMode() !== null) {
                mode = LocalStorageService.getSwitchMode();
            } else {
                mode = 1;
            }
        }
        LocalStorageService.setSwitchMode(mode);

        if (mode == 1) {
            CallService.getCertificates(query,
                this.state.sorting, pageNumber, maxResults)
                .then(response => {
                    LocalStorageService.setTotalPages(response.headers.totalpages);
                    if((Number(pageNumber) > Number(response.headers.totalpages)) && (Number(response.headers.totalpages) !== 0)) {
                        this.update( undefined, response.headers.totalpages, undefined);
                    }
                    this.setState({
                        certificates: this.getListCertificates(response.data),
                        pageNumber: pageNumber,
                        maxResults: maxResults,
                        mode: mode
                    });
                }).catch(error => {
                this.handleExceptions(error);
            });
        } else if (mode == 2) {
            CallService.getUserCertificates(
                LocalStorageService.getUser().id, pageNumber, maxResults)
                .then(response => {
                    LocalStorageService.setTotalPages(response.headers.totalpages);
                    if((Number(pageNumber) > Number(response.headers.totalpages)) && (Number(response.headers.totalpages) !== 0)) {
                        this.update( undefined, response.headers.totalpages, undefined);
                    }
                    this.setState({
                        certificates: this.getListCertificates(response.data),
                        pageNumber: pageNumber,
                        maxResults: maxResults,
                        mode: mode
                    });
                }).catch(error => {
                this.handleExceptions(error);
            });
        }
    }

    handleExceptions = (error) => {
        let errors = [];
        if (error.response !== undefined) {
            for (let iter = 0; iter < error.response.data.messages.length; iter++) {
                errors.push(error.response.data.messages[iter]);
            }
        } else {
            errors.push(error.message);
        }
        this.setState({
            errors: errors
        });
    };

    setError(error) {
        let errors = [];
        errors.push(error);
        this.setState({
            errors: errors
        });
    };

    paginate(pageNumber, maxResults) {
        this.update(undefined, pageNumber, maxResults);
    }

    switch(mode) {
        this.update("", 1, 6, mode);
    }

    setLanguage(languageCode) {
        this.state.localeWrapper.setLanguage(languageCode);
        this.update();
    }

    getListCertificates(certificates) {
        let thisList = [];
        for (let iter = 0; iter < certificates.giftCertificates.length; iter++) {
            let tags = [];
            for (let tagIter = 0; tagIter < certificates.giftCertificates[iter].tags.length; tagIter++) {
                tags.push(certificates.giftCertificates[iter].tags[tagIter].name);
            }
            thisList.push(new Certificate(certificates.giftCertificates[iter].id,
                certificates.giftCertificates[iter].name,
                certificates.giftCertificates[iter].description,
                certificates.giftCertificates[iter].price,
                moment(certificates.giftCertificates[iter].creationDate).format('MMMM DD, YYYY'),
                tags
            ));
        }
        return thisList;
    }

    checkIsAdmin = () => {
        if (LocalStorageService.getUser() == null || LocalStorageService.getUser().role !== "ROLE_ADMIN") {
            alert(this.state.localeWrapper.locale.adminIsLogOut);
            return false;
        }
        return true;
    };

    deleteCertificate(certificate) {
        if (this.checkIsAdmin()) {
            CallService.deleteCertificate(certificate.id)
                .then(response => {
                    this.update();
                }).catch(error => {
                if (error.response !== undefined) {
                    alert(this.state.localeWrapper.locale.alreadyDeleted);
                } else {
                    alert(error.message);
                }
                this.update();
            });
        }
        this.update();
    }

    editCertificate(certificate) {
        LocalStorageService.setCertificate(certificate);
        this.props.history.replace("/edit");
    }

}

export default UserPage;