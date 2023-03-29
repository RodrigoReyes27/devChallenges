import { db, auth } from '../config/firebase';
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { updateEmail, updatePassword } from 'firebase/auth';

// Hacer referencia a la coleccion de donde se obtendran los datos
const profileCollectionRef = collection(db, "profiles");

// Obtener los datos del perfil
export async function getProfileData() {
    if (auth?.currentUser) {
        try {
            const filteredProfiles = query(profileCollectionRef, where("uid", "==", auth?.currentUser?.uid));
            const data = await getDocs(filteredProfiles);
            const filteredData = data.docs.map(doc => {
                const data = doc.data();
                return {
                    photo: data.photo,
                    name: data.name,
                    bio: data.bio,
                    phone: data.phone,
                    email: data.email,
                    password: "*******",
                    id: doc.id
                }
            });
            return Promise.resolve(filteredData[0]);
        }
        catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }
}

export async function updateProfileData(id, data) {
    try {
        if (data.password != "") {
            await updatePassword(auth.currentUser, data.password);
        }
        if (data.email != auth.currentUser.email) {
            await updateEmail(auth.currentUser, data.email);
        }
        delete data.password;

        const profileDoc = doc(db, "profiles", id);
        await updateDoc(profileDoc, data);
    }
    catch (error) {
        console.error(error);
    }
}

export async function createProfileData() {
    if (auth?.currentUser) {
        try {
            await addDoc(profileCollectionRef, {
                photo: null,
                name: "",
                bio: "",
                phone: "",
                email: auth?.currentUser?.email,
                uid: auth?.currentUser?.uid
            });
        }
        catch (err) {
            console.error(err)
        }
    }
}