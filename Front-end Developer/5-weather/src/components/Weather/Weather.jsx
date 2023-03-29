import React, { useState, useEffect } from "react";
import Day from "./Day";
import Hightlight from "./Hightlight";
import { useAppContext } from "../../contexts/ContextProvider";

function Weather(props) {
    const {units, setUnits} = useAppContext()
    const [todayData, setTodayData] = useState([])
    const [forecast, setForecast] = useState([])

    const forecastElements = forecast.map(days => {
        return (
            <Day
                key={days.date}
                date={days.date}
                minTemp={days.minTemp}
                maxTemp={days.maxTemp}
                icon={days.icon}
                units={units === "metric" ? "C" : "F"}
            />
        )
    });

    const hightlightElements = todayData.map(data => {
        return (
            <Hightlight
                key={data.category}
                category={data.category}
                data={data.data}
                units={data.units}
            />
        );
    })

    // Datos mas especificos del dia
    useEffect(() => {
        if (props.dataToday !== undefined) {
            const dataArray = [
                {category: 'Pressure',
                data: props.dataToday.main.pressure,
                units: 'hPa'}, 
                {category: 'Humidty',
                data: props.dataToday.main.humidity,
                units: '%'}, 
                {category: 'Wind Speed',
                data: props.dataToday.wind.speed,
                units: `${units === "metric" ? "m/s" : "miles/hr"}`},
                {category: 'Feels like',
                data: props.dataToday.main.feels_like,
                units: `°${units === "metric" ? "C" : "F"}`}
            ];
            setTodayData(dataArray);
        }
    }, [props.dataToday])

    useEffect(() => {
        if (props.dataMain !== undefined && props.dataToday !== undefined) {
            const daysArray = [];
            let date = '', minTemp = 900, maxTemp = -200;

            for (const element of props.dataMain) {
                let forecastDay = element.dt_txt.split(' ')[0]
                
                if (element.main.temp_min < minTemp) {
                    minTemp = element.main.temp_min
                }
                if (element.main.temp_max > maxTemp) {
                    maxTemp = element.main.temp_max
                }
                if (forecastDay !== date) {
                    if (date !== '') {
                        daysArray.push({date, minTemp, maxTemp, icon: element.weather[0].icon})
                        minTemp = 900
                        maxTemp = -200
                    }
                    date = element.dt_txt.split(' ')[0]
                }
            }

            setForecast(daysArray)
        }
    }, [props.dataMain])
    
    return (
        <div className="specific-information">
            <div className="toggle-units">
                <button className={`btn btn-units ${units === "metric" && "active"}`} onClick={() => setUnits("metric")}>°C</button>
                <button className={`btn btn-units ${units === "imperial" && "active"}`} onClick={() => setUnits("imperial")}>°F</button>
            </div>
            <div className="day-items-container">
                {forecastElements}
            </div>
            <div className="today-hightlights">
                {hightlightElements.length > 0 && <h1>Today's Hightlights</h1>}
                <div className="hightlights-items">
                    {hightlightElements}
                </div>
            </div>
        </div>
    );
}

export default Weather;