import { useContext, createContext, useState, useMemo, useEffect } from "react";

const StateContext = createContext({
    showNavbar: null,
    showWeather: null,
    currentCity: null,
    citiesHistory: [],
    units: null,
    setShowNavbar: () => {},
    setShowWeather: () => {},
    setCurrentCity: () => {},
    setCitiesHistory: () => {},
    setUnits: () => {}
})

export const ContextProvider = ({children}) => {
    const [showNavbar, setShowNavbar] = useState(true);
    const [showWeather, setShowWeather] = useState(false);
    const [currentCity, setCurrentCity] = useState("");
    const [citiesHistory, setCitiesHistory] = useState(
        () => JSON.parse(localStorage.getItem("citiesHistory")) || []
    );
    const [units, setUnits] = useState("metric")

    const appValues = useMemo(() => (
            {showNavbar, setShowNavbar, showWeather, setShowWeather, currentCity, setCurrentCity, citiesHistory, setCitiesHistory, units, setUnits}
        ),
            [showNavbar, showWeather, currentCity, citiesHistory, units]
        );

    

    useEffect(() => {
        if (currentCity === "") return
        const newHistoryCities = [currentCity, ...citiesHistory.filter(city => city !== currentCity)]

        setCitiesHistory(newHistoryCities.splice(0,6))
        
        if (showNavbar === true) {
            setShowNavbar(prev => !prev);
            setShowWeather(prev => !prev);
        }
    }, [currentCity])


    useEffect(() => {
        if (citiesHistory.length !== 0) {
            localStorage.setItem("citiesHistory", JSON.stringify(citiesHistory))
        }
    }, [citiesHistory])


    return (
        <StateContext.Provider value={appValues}>
            {children}
        </StateContext.Provider>
    )
}

export const useAppContext = () => useContext(StateContext)