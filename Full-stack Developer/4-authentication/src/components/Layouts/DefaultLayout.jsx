import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useStateContext } from '../../context/ContextProvider'
import Navbar from '../Navbar';

function DefaultLayout() {
    const { user } = useStateContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(!user) {
            navigate('/login');
        }
    }, [user])

    return (
        <div className='min-h-screen mx-auto w-screen dark:bg-darkColor-500'>
            <div className="container mx-auto flex flex-col">
                <Navbar
                    profile={false}
                />
                <Outlet />
            </div>
        </div>
    )
}

export default DefaultLayout