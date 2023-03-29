import React, { useContext, useEffect } from "react";
import { useAppContext } from "../../contexts/ContextProvider";
import Tools from "./Tools";
import WeatherCondition from "./WeatherCondition";

function WeatherNavbar(props) {
    const {showWeather, setShowWeather, setShowNavbar} = useAppContext()

    const weatherElement = props.data.map(data => {
        return (
            <div key={data.id}>
                <WeatherCondition 
                    temp={data.main.temp}
                    description={data.weather[0].description}
                    icon={data.weather[0].icon}
                />
                <div className="date-information">
                    <p>Today</p>
                    <i className="fa-solid fa-circle"></i>
                    <p>{`${getCurrentDay()}`}</p>
                </div>
                <div className="location">
                    <i className="fa-solid fa-location-dot"></i>
                    <p>{data.name}</p>
                </div>
            </div>
        )
    })

    function closeNavbar() {
        setShowWeather(false)
        setShowNavbar(true)
    }

    function getCurrentDay() {
        return new Date().toLocaleDateString('en-us', { weekday:"short", month:"short", day:"numeric"})
    }

    return (
        <div className={showWeather ? "weather show" : "weather hidden"}>
            <div className="main-weather-container">
                <Tools handleClose={closeNavbar} currentLocation={props.currentLocation} />
                {weatherElement}
            </div>
        </div>
    );
}

export default WeatherNavbar