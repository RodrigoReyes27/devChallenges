import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input'
import SocialMedia from '../../components/SocialMedia';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { createProfileData } from '../../helpers/profileData';

function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);

    async function createWithEmailPassword() {
        try {
            await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
            createProfileData().then(navigate("/profile"));
        }
        catch (error) {
            console.log(error)
            setErrors("An error occured");
        }
    }

    return (
        <div className='container-center md:my-8 md:py-10 md:px-12 max-w-[30rem] border-solid border-1 border-transparent md:border-gray-400 rounded-3xl'>
            <h1>Join thousands of learners from around the world</h1>
            <h3>Master web development by making real-life projects. There are multiple paths for you to choose</h3>
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
            <Button text={"Start coding now"} type={"btn-primary"} handleClick={createWithEmailPassword} />
            <h4 className='text-center py-4 text-gray-500'>or continue with these social profile</h4>
            <SocialMedia />
            <h4 className='text-center py-6 text-gray-500'>Already a member? <a href="/login">Login</a></h4>
        </div>
    )
}

export default Signup