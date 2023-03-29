import React from "react";

function Random(props) {
    return (
        <button className="btn btn-random" onClick={props.handleClick}>
            random <i className="fa-solid fa-arrows-rotate"></i>
        </button>
    )
}

export default Random;