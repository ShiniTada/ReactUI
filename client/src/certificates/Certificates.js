import React from 'react';
import SingleCertificate from "./SingleCertificate";
import CertificatePopup from "../popup/CertificatePopup";
import BuyPopup from "../popup/BuyPopup";
import DeleteConfirm from "../popup/DeleteConfirm";

const Certificates = (props) => {
    return (
        <div>
            <h2>{props.locale.certificates}</h2>
            <div className="row">
                {props.certificates !== null && props.certificates.map(thisCertificate => (
                    <div>
                        <SingleCertificate certificate={thisCertificate}
                                           user={props.user}
                                           searchByTag={props.searchByTag}
                                           editCertificate={props.editCertificate}
                                           locale={props.locale}
                        />
                        <CertificatePopup locale={props.locale}
                                          certificate={thisCertificate}/>
                        <DeleteConfirm locale={props.locale}
                                       certificate={thisCertificate}
                                       isDelete={(answer) => {
                                           if (answer === "ok") {
                                               props.deleteCertificate(thisCertificate)
                                           }
                                       }}/>
                        <BuyPopup locale={props.locale}
                                  certificate={thisCertificate}
                                  update={props.update}
                                  setError={props.setError}
                                  history={props.history}/>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default Certificates;