import React, { useState, useEffect } from "react";
import { useAppContext } from "../../contexts/ContextProvider";
import cloudBackground from "./../../images/Cloud-Background.png";

function WeatherCondition(props) {
    const [description, setDescription]= useState("");
    const {units} = useAppContext()

    useEffect(() => {
        const arr = props.description.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        
        setDescription(arr.join(" "))
    }, [])

    return (
        <div className="weather-condition">
            <img src={cloudBackground} className="background-clouds"/>
            {/* <img src={weatherImage} className="weather-image"/> */}
            <img src={`http://openweathermap.org/img/wn/${props.icon}@4x.png`} className="weather-image"/>
            <h1 className="txt-center"><strong>{Math.round(props.temp)}</strong>°{units === "metric" ? "C" : "F"}</h1>
            <h2 className="txt-center">{description}</h2>
        </div>
    );
}

export default WeatherCondition;