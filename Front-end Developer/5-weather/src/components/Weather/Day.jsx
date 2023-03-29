import React from "react";

function Day(props) {
    function convertDate(date) {
        return new Date(`${date}T00:00:00`).toLocaleDateString('en-us', { weekday:"short", day:"numeric"})
    }
    
    return (
        <div className="item">
            <h3>{`${convertDate(props.date)}`}</h3>
            <img src={`http://openweathermap.org/img/wn/${props.icon}@4x.png`} alt="" />
            <p className="max">{Math.round(props.maxTemp)}°{props.units}</p>
            <p className="min">{Math.round(props.minTemp)}°{props.units}</p>
        </div>
    );
}

export default Day