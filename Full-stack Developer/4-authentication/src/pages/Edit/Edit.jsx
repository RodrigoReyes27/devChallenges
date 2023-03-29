import React, { useRef, useState, useEffect } from 'react'
import Button from './../../components/Button';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/Input';
import { getProfileData, updateProfileData } from '../../helpers/profileData';
import { auth, storage } from '../../config/firebase';
import { nanoid } from 'nanoid';
import { ref, uploadBytes, getDownloadURL} from "firebase/storage"

function Edit() {
    const navigate = useNavigate();
    const nameRef = useRef();
    const bioRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const photoRef = useRef();
    const [photoUrl, setPhotoUrl] = useState(null);
    const refs = [photoRef, nameRef, bioRef, phoneRef, emailRef, passwordRef];

    const [profileData, setProfileData] = useState({
        photo: null,
        name: null,
        bio: null,
        phone: null,
        email: null,
        password: null,
        id: null
    });

    // Mapear datos del perfil
    const profileElement = Object.entries(profileData).map(([key, value], index) => {
        const count = index;
        if (key == "photo" || key == "id" || (key == "email" && value == null) || (key == "password" && auth?.currentUser?.providerData[0]?.providerId != "password")) {
            return
        }
        else if (key == "password") {
            return <Input key={key} name={key} type={"password"} icon={""} ref={refs[count]} label={true} />
        }
        else {
            return <Input key={key} name={key} type={"text"} icon={""} ref={refs[count]} label={true} value={value} />
        }
    });

    function uploadFile(file) {
        if (file == null) return;
		
		const imageRef = ref(storage, `images/${nanoid()}`);
		uploadBytes(imageRef, file).then(snapshot => {
			getDownloadURL(snapshot.ref).then(url => setPhotoUrl(url));
		});
    }

    function saveChanges(id) {
        const newData = {
            photo: photoUrl,
            name: nameRef.current.value,
            bio: bioRef.current.value,
            phone: phoneRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        updateProfileData(id, newData).then(navigate("/profile"));
    }

    // Solicitar los datos al montar
    useEffect(() => {
        getProfileData().then(data => setProfileData(data));
    }, [])

    return (
        <div className='md:my-8'>
            <div className='container-center mb-8'>
                <Link to="/profile">
                    <i className="fa-solid fa-chevron-left text-blue-400 text-lg"></i>
                    <p className='mx-4 text-lg inline-block'>Back</p>
                </Link>
            </div>
            <div className='container-center md:py-10 md:px-12 max-w-[450rem] border-solid border-1 border-transparent md:border-gray-400 rounded-3xl'>
                <div className="">
                    <h1 className=''>Change info</h1>
                    <h4 className="text-gray-500 max-w-[80%]">Changes will be relfected to every services</h4>
                    <div className="flex items-center">
                    </div>
                </div>
                <label htmlFor="image" className='block text-white bg-blue-500 rounded-lg hover:bg-blue-600 hover:shadow-md cursor-pointer w-fit my-6 py-2 px-4 transition'>Choose a file</label>
				<input type="file" name='image' id='image' className='sr-only' ref={photoRef} onChange={(event) => uploadFile(event.target.files[0])}/>
                {profileElement}
                <div className='my-8 max-w-[120px]'>
                    <Button
                        text={"Save"}
                        type={"btn-secondary"}
                        handleClick={() => saveChanges(profileData.id)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Edit