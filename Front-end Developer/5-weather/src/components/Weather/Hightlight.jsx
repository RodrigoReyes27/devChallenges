import React from "react";

function Hightlight(props) {
    return (
        <div className="item">
            <h2 className="category">{props.category}</h2>
            <h3 className="data"><strong>{props.data}</strong> {props.units}</h3>
        </div>
    );
}

export default Hightlight;