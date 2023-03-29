import React, { useEffect, useState } from 'react'
import Button from './../../components/Button';
import BioElement from './BioElement';
import profile from "./../../assets/profilePhoto.png"
import { useNavigate } from 'react-router-dom';
import { getProfileData } from '../../helpers/profileData';

function Profile() {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({
        photo: null,
        name: null,
        bio: null,
        phone: null,
        email: null,
        password: null
    });

    // Mapear datos del perfil
    const profileElement = Object.entries(profileData).map(([key, value]) => {
        if (key == "photo" && value) {
            return <BioElement key={key} category={key} img={value} information={"profile-picture"} />
        }
        else if (key == "photo") {
            return <BioElement key={key} category={key} img={profile} information={"profile-picture"} />
        }
        else if (key == "id" || (key == "email" && value == null)) {
            return
        }
        else {
            return <BioElement key={key} category={key} img={null} information={value} />
        }
    });

    // Solicitar los datos al montar
    useEffect(() => {
        getProfileData().then(data => setProfileData(data));
    }, [])

    return (
        <div className='md:my-8'>
            <h1 className="text-center text-3xl">Personal info</h1>
            <h3 className="text-center text-gray-500 mb-8">Basic info, like your name and photo</h3>
            <div className='container-center max-w-[450rem] border-solid border-1 border-transparent md:border-gray-400 rounded-3xl'>
                <div className="flex justify-between md:py-10 md:px-12">
                    <div>
                        <h1>Profile</h1>
                        <h4 className="text-gray-500 max-w-[80%]">Some info may be visible to other people</h4>
                    </div>
                    <div className="flex items-center">
                        <Button
                            text={"Edit"}
                            type={"btn-empty h-fit w-fit"}
                            handleClick={() => navigate('/edit')}
                        />
                    </div>
                </div>
                {profileElement}
            </div>
        </div>
    )
}

export default Profile