import React from "react";
import { useAppContext } from "../../contexts/ContextProvider";

function HistoryItem(props) {
    const {setCurrentCity} = useAppContext()

    function handleClick() {
        props.closeNavbar();
        setCurrentCity(props.city)
    }
    
    return (
        <button className="history-item btn" onClick={handleClick}>
            {props.city}
            <i className="fa-solid fa-greater-than"></i>
        </button>
    );
}

export default HistoryItem;