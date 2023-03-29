import React from "react";

function Quote(props) {
    return (
        <div className="quote">
            {props.text && <p>"{props.text}"</p>}
        </div>
    )
}

export default Quote;