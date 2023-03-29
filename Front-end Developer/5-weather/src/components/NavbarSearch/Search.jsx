import React, { useEffect, useRef, useState} from "react";
import { useAppContext } from "../../contexts/ContextProvider";

// Google Places Autocomplete https://youtu.be/LnF79PMKHUs
// load google map api js
function loadAsyncScript() {
    return new Promise(resolve => {
        const script = document.createElement("script");
        Object.assign(script, {
            type: "text/javascript",
            async: true,
            src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBLKQ3kIXr9Dm7nn1-FfWXiUVBy7KL0Cnw&libraries=places&callback=Function.prototype&language=en"
        });
        script.addEventListener("load", () => resolve(script));
        document.head.appendChild(script);
    })
}

// https://stackoverflow.com/questions/7865446/google-maps-places-api-v3-autocomplete-select-first-option-on-enter
function enableEnterKey(input) {
    /* Store original event listener */
    const _addEventListener = input.addEventListener

    const addEventListenerWrapper = (type, listener) => {
      if (type === 'keydown') {
        /* Store existing listener function */
        const _listener = listener
        listener = (event) => {
          /* Simulate a 'down arrow' keypress if no address has been selected */
          const suggestionSelected = document.getElementsByClassName('pac-item-selected').length
          if (event.key === 'Enter' && !suggestionSelected) {
            const e = new KeyboardEvent('keydown', { 
              key: 'ArrowDown', 
              code: 'ArrowDown',
              keyCode: 40,
            })
            _listener.apply(input, [e])
          }
          _listener.apply(input, [event])
        }
      }
      _addEventListener.apply(input, [type, listener])
    }

    input.addEventListener = addEventListenerWrapper
}


function Search() {
    const searchInput = useRef();
    const searchButton = useRef();
    const {setCurrentCity} = useAppContext();


    // init gmap script
    function initMapScript() {
        // if script already loaded
        if(window.google) {
            return Promise.resolve();
        }
        return loadAsyncScript();
    }


    // init autocomplete
    function initAutocomplete() {
        if (!searchInput.current) return;
    
        const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current, {
            fields: ['geometry', 'name'],
            types: ['(cities)']
        });

        // Cuando se selecciona una ciudad
        searchButton.current.addEventListener("click", () => {
            // Add ENTER event to input
            searchInput.current.focus();
    
            let event = new Event('keydown');
            event.key = 'Enter';
            searchInput.current.dispatchEvent(event)
            handleSubmit(autocomplete);
        });
        enableEnterKey(searchInput.current)
        autocomplete.addListener("place_changed", () => handleSubmit(autocomplete));
    }


    function handleSubmit(autocomplete) {
        let city
        if (!autocomplete.getPlace()) {
            // Puede que no funcione
            city = searchInput.current.value.split(',')[0]
        }
        else {
            city = autocomplete.getPlace().name;
        }
        
        setCurrentCity(city);
        searchInput.current.value = "";
    }
    

    // load map script after mounted
    useEffect(() => {
        initMapScript().then(() => initAutocomplete())
    }, [])


    return (
        <div className="search-input">
            <div className="input-container">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="search location" ref={searchInput}/>
            </div>
            <button className="btn" ref={searchButton}>Search</button>
        </div>
    );
}

export default Search;