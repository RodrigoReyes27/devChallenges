import React from "react";

function Delete(props) {
    return (
        <form onSubmit={props.handleDelete}>
            <fieldset className="delete-container">
                <button>
                    <i className="fa-solid fa-trash"></i>
                    Delete all
                </button>
            </fieldset>
        </form>
    )
}

export default Delete;