import { onAuthStateChanged } from "firebase/auth";
import { useContext, createContext, useState, useMemo, useLayoutEffect, useEffect } from "react";
import { auth } from "../config/firebase";

const StateContext = createContext({
    user: null,
    darkMode: null,
    setUser: () => { },
    toggleDarkMode: () => { },
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [darkMode, setDarkMode] = useState(
        () => JSON.parse(localStorage.getItem("darkMode")) || false
    );

    function toggleDarkMode() {
        localStorage.setItem("darkMode", !darkMode);
        setDarkMode(prevMode => !prevMode);
    }

    const appValues = useMemo(() => (
        { user, setUser, darkMode, toggleDarkMode }
    ),
        [user, darkMode]
    );

    // Antes de cargar la pagina checar si el modo es dark
    useLayoutEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [darkMode])

    // Cuando cambie el Auth State checar si se tiene sesion iniciada
    useEffect(() => {
        // Inicializar observer
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser.uid)
            }
            else {
                setUser(null)
            }
        });
    }, [])

    return (
        <StateContext.Provider value={appValues}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);