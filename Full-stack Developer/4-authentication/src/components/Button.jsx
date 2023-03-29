import React from 'react'

function Button(props) {
    return (
        <button onClick={(ev) => props.handleClick(ev)} className={`btn ${props.type}`}>
            {props.text}
        </button>
    );
}

export default Button