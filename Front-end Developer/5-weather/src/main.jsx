import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ContextProvider } from "./contexts/ContextProvider";
import './style.css'
import './autocomplete.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ContextProvider>
        <App />
    </ContextProvider>
)
