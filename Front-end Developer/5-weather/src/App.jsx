import React, {useState, useMemo, useTransition, useEffect} from "react";
import SearchNavbar from "./components/NavbarSearch/SearchNavbar";
import { useAppContext } from "./contexts/ContextProvider";
import Weather from "./components/Weather/Weather";
import WeatherNavbar from "./components/NavbarWeather/WeatherNavbar";

function App() {
    const {showNavbar, showWeather, currentCity, setCurrentCity ,units} = useAppContext();
    const [width, setWidth] = useState(window.innerWidth);
    const mobileBreakpoint = 768;
    const [dataNavbar, setDataNavbar] = useState([]);
    const [dataMain, setDataMain] = useState([]);

    // Fetch weather data from current location
    async function fetchCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                
                // Datos del dia
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=7b1af693c852187af028472f4f73b819&units=${units}`)
                .then(res => res.json())
                .then(data => {
                    setDataNavbar([data])
                    setCurrentCity(data.name)
                })
                .catch(error => console.log(error))
                
                // Pronostico
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=7b1af693c852187af028472f4f73b819&units=${units}`)
                .then(res => res.json())
                .then(data => setDataMain([...data.list]))
                .catch(error => console.log(error))
            });
        }
        else {
            console.log("Geolocation is not supported by this browser.")
        }
    }

    // Fetch weather data
    useEffect(() => {
        if (currentCity !== "") {
            // Datos del dia
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&APPID=7b1af693c852187af028472f4f73b819&units=${units}`)
                .then(res => res.json())
                .then(data => setDataNavbar([data]))
                .catch(error => console.log(error))

            // Pronostico
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&APPID=7b1af693c852187af028472f4f73b819&units=${units}`)
                .then(res => res.json())
                .then(data => setDataMain([...data.list]))
                .catch(error => console.log(error))
        }
    }, [currentCity, units])

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleWindowResize);

        return () => window.removeEventListener('resize', handleWindowResize);
    })

    return (
        <main>
            <div className="content-container">
                <div className="navbar">
                    {showNavbar && <SearchNavbar />}
                    {showWeather && <WeatherNavbar data={dataNavbar} currentLocation={fetchCurrentLocation}/>}
                </div>
                {showNavbar ? width > mobileBreakpoint && <Weather dataMain={dataMain} dataToday={dataNavbar['0']}/> : <Weather dataMain={dataMain} dataToday={dataNavbar['0']} />}
            </div>
        </main>
    );
}

export default App;