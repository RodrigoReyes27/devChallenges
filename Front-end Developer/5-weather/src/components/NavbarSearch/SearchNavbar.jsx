import React, {useContext} from "react";
import { useAppContext } from "../../contexts/ContextProvider";
import HistoryItem from "./HistoryItem";
import Search from "./Search";

function SearchNavbar() {
    const {showNavbar, setShowNavbar, setShowWeather, citiesHistory} = useAppContext()

    const historyElements = citiesHistory.map(city => {
        return (
            <HistoryItem 
                key={city}
                city={city}
                closeNavbar={closeSearchNavbar}
            />
        )
    });

    function closeSearchNavbar() {
        setShowNavbar(false);
        setShowWeather(true);
    }
    
    return (
        <div className={showNavbar ? "navbar-search show" : "navbar-search hidden"}>
            <button className="btn btn-close" onClick={closeSearchNavbar}>
                <i className="fa-solid fa-xmark"></i>
            </button>
            <Search />
            <div className="history-items">
                {historyElements}
            </div>
        </div>
    )
}

export default SearchNavbar;