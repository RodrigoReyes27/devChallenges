import React from "react";

function Tabs(props) {
    return (
        <ul className="tabs-container">
            <li 
                className={props.currentTab === "all" ? "option active" : "option"}
                onClick={() => props.handleTabChange("all")}
            >
                All
            </li>
            <li 
                className={props.currentTab === "active" ? "option active" : "option"} 
                onClick={() => props.handleTabChange("active")}
            >
                Active
            </li>
            <li
                className={props.currentTab === "completed" ? "option active" : "option"}
                onClick={() => props.handleTabChange("completed")}
            >
                Completed
            </li>
        </ul>
    );
}

export default Tabs;