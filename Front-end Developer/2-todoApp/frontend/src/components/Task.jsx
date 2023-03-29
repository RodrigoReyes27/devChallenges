import React, {useState, useEffect}from "react";

function Task(props) {
    return (
        <div className="task">
            <label className="checkbox-container">
                <input 
                    type="checkbox"
                    name="task"
                    id="name"
                    value={props.completed}
                    checked={props.completed}
                    onChange={() => props.handleChange(props.id, !props.completed)}
                />
                <span className="checkmark"></span>
            </label>
            <p className={props.completed ? "completed" : ""}>
                {props.details}
            </p>
            <i className="fa-solid fa-trash" onClick={() => props.handleDelete(props.id)}></i>
        </div>
    );
}

export default Task