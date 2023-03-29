import { createBrowserRouter } from "react-router-dom";
import  DefaultLayout from "./components/Layouts/DefaultLayout"
import GuestLayout from "./components/Layouts/GuestLayout"
import { Login, Profile, Signup, Edit } from "./pages";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/edit',
                element: <Edit />
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },
])

export default router;