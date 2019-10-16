import React from 'react';
import LoginNavbar from "../navbar/LoginNavbar";
import LocaleWrapper from "../localization/LocaleWrapper";
import Footer from "../footer/Footer";

class AccessIsDeniedPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            localeWrapper: new LocaleWrapper(),
            update: false
        };

        this.setLanguage = this.setLanguage.bind(this);
    }


    render() {
        let locale = this.state.localeWrapper.locale;
        return (
            <div>
                <LoginNavbar locale={locale}
                             setLanguage={this.setLanguage}/>
                <div className="big-wrap wrapper">
                    <div className="container text-center">
                        <div className="wrapper">
                            <div className="container text-center">
                                <div style={{height: '10%'}}></div>
                                <div>
                                    <h1>{locale.accessIsDenied}</h1>
                                    <h3>{locale.notAvailable}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer locale={locale}/>
            </div>
        );
    }

    setLanguage(languageCode) {
        this.state.localeWrapper.setLanguage(languageCode);
        this.setState({
            update: true
        })
    }

}

export default AccessIsDeniedPage;