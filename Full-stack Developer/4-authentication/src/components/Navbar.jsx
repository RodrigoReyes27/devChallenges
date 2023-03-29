import React from 'react'
import devchallenges from "./../assets/devchallenges.svg"
import devchallengesLight from "./../assets/devchallenges-light.svg"
import { useStateContext } from '../context/ContextProvider'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'

function Navbar(props) {
    const { darkMode, toggleDarkMode } = useStateContext();
    const { setUser } = useStateContext();

    async function logout() {
        console.log("logout");
        try {
            await signOut(auth);
            setUser(null);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex justify-between items-center h-14 container-center'>
            {
                !darkMode &&
                <img
                    src={devchallenges}
                    alt="devchallenges-logo"
                    className='max-w-[12rem]'
                />
            }
            {
                darkMode &&
                <img
                    src={devchallengesLight}
                    alt="devchallenges-logo"
                    className='max-w-[12rem]'
                />
            }
            <div>
                {props.profile && <div>Profile pic</div>}
                {
                    !darkMode &&
                    <button onClick={() => toggleDarkMode()}>
                        <i className="fa-solid fa-moon"></i>
                    </button>
                }
                {
                    darkMode &&
                    <button onClick={() => toggleDarkMode()}>
                        <i className="fa-solid fa-sun text-gray-400"></i>
                    </button>
                }
                <button className='px-2 dark:text-white' onClick={logout}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar