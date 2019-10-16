import React from "react";

const SingleTag = (props) => {
    return (
        <span>
            <button type="button"
                    className="btn btn-success inside-tag-margin btn-sm "
                    onClick={() => props.searchByTag(props.tag)}
            >{props.tag}</button>
         </span>
    );
};

export default SingleTag;