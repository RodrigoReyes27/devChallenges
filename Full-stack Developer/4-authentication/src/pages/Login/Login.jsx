import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input'
import SocialMedia from '../../components/SocialMedia';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);
    
    async function loginWithEmailPassword() {
        try {
            await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
            navigate("/profile");
        }
        catch (error) {
            setErrors("Email or Password is incorrect");
        }
    }

    return (
        <div className='container-center md:my-8 md:py-10 md:px-12 max-w-[30rem] border-solid border-1 border-transparent md:border-gray-400 rounded-3xl'>
            <h1>Login</h1>
            {errors && <h3 className='text-red-500 dark:text-red-500'>{errors}</h3>}
            <Input
                name={"Email"}
                type={"mail"}
                icon={"fa-regular fa-envelope"}
                ref={emailRef}
                label={false}
            />
            <Input
                name={"Password"}
                type={"password"}
                icon={"fa-solid fa-lock"}
                ref={passwordRef}
                label={false}
            />
            <Button text={"Start coding now"} type={"btn-primary"} handleClick={loginWithEmailPassword} />
            <h4 className='text-center py-4 text-gray-500'>or continue with these social profile</h4>
            <SocialMedia />
            <h4 className='text-center py-6 text-gray-500'>Don't have an account yet? <a href="/signup">Register</a></h4>
        </div>
    )
}

export default Login