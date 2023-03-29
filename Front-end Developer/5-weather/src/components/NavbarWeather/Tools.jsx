import React from "react";

function Tools(props) {
    return (
        <div className="tools">
            <button className="btn-places btn" onClick={props.handleClose}>
                Search for places
            </button>
            <button className="btn btn-current-location" onClick={props.currentLocation}>
                <i className="fa-solid fa-location-crosshairs"></i>
            </button>
        </div>
    );
}

export default Tools;