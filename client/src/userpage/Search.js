import React from "react";

const Search = (props) => {
    return (
        <div>
            <div className=" form-inline">
                <div className="margin-left">
                    <input type="text"
                           id="query"
                           className="form-control"
                           placeholder={props.locale.search}/>
                    <button type="button"
                            className="btn btn-warning big-text"
                            onClick={props.searchCertificates}>
                        {props.locale.go}
                    </button>
                </div>
            </div>

        </div>

    );
};

export default Search;