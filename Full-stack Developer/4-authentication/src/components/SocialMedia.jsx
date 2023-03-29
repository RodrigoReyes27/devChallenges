import React from 'react'
import SocialMediaIcon from './SocialMediaIcon'
import google from "./../assets/google.svg"
import facebook from "./../assets/facebook.svg"
import twitter from "./../assets/twitter.svg"
import github from "./../assets/github.svg"
import { FacebookAuthProvider, GithubAuthProvider, signInWithPopup, TwitterAuthProvider } from 'firebase/auth'
import { auth, googleProvider } from '../config/firebase'
import { createProfileData } from '../helpers/profileData'
createProfileData

function SocialMedia() {
    async function signIn(provider) {
        try {
            await signInWithPopup(auth, provider);
            createProfileData().then(navigate("/profile"));
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex justify-center gap-4'>
            <SocialMediaIcon
                src={google}
                socialMedia={"google-logo"}
                handleClick={() => signIn(googleProvider)}
            />
            <SocialMediaIcon
                src={facebook}
                socialMedia={"facebook-logo"}
                handleClick={() => signIn(FacebookAuthProvider)}
            />
            <SocialMediaIcon
                src={twitter}
                socialMedia={"twitter-logo"}
                handleClick={() => signIn(TwitterAuthProvider)}
            />
            <SocialMediaIcon
                src={github}
                socialMedia={"github-logo"}
                handleClick={() => signIn(GithubAuthProvider)}
            />
        </div>
    )
}

export default SocialMedia