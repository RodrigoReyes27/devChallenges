import React from "react";

function Author(props) {
    return (
        <button className="btn btn-author" onClick={() => props.handleClick(props.author)}>
            {props.author} <i className="fa-solid fa-arrow-right"></i>
        </button>
    )
}

export default Author;