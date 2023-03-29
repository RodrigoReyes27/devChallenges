import React, {useRef} from "react";

function Add(props) {
    const inputRef = useRef(null);

    function handleSubmit(event) {
        event.preventDefault();
    
        fetch('http://localhost:8080/activities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                activity: inputRef.current.value
            })
        })
            .then(() => props.getTasks())
            // .then(res => res.json())
            // .then(json => console.log(json))
            .catch(error => console.error(error));

        inputRef.current.focus();
        inputRef.current.value = ""
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset className="add-container">
                <input
                    type="text"
                    placeholder="add details"
                    name="newTaskDetails"
                    id="newTaskDetails"
                    ref={inputRef}
                />
                <button>Add</button>
            </fieldset>
        </form>
    )
}

export default Add;