import React from 'react'
import { useState, useEffect, useRef } from "react"
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage"
import { storage } from "./firebase"
import { v4 } from "uuid"
import { nanoid } from "nanoid";

// Codigo basado en
// https://github.com/machadop1407/firebase-file-upload

function App() {
	const [status, setStatus] = useState("uploading");
	const fileRef = useRef(null)
	const [imageUploaded, setImageUploaded] = useState(null);
	const imagesListRef = ref(storage, "images/");

	const uploadFile = (file) => {
		if (file == null) return;
		setStatus("uploading")
		
		const imageRef = ref(storage, `images/${nanoid() + v4()}`);
		uploadBytes(imageRef, file).then(snapshot => {
			getDownloadURL(snapshot.ref).then(url => {
				setImageUploaded(url);
				setStatus("completed")
			});
		});
	};
	
	// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop#define_the_drop_zone
	function handleImageDrop(event) {
		event.preventDefault();
		setStatus("uploading")
		
		if (event.dataTransfer.items) {
			// Use DataTransferItemList interface to access the file(s)
			[...event.dataTransfer.items].forEach((item, i) => {
				// If dropped items aren't files, reject them
				if (item.kind === 'file') {
					let file = item.getAsFile();
					uploadFile(file)
				}
			});
		}
	}

	function copyClipboard() {
		// Copy the text inside the text field
		navigator.clipboard.writeText(imageUploaded);
	}

	useEffect(() => {
		listAll(imagesListRef).then(response => {
			response.items.forEach(item => {
				getDownloadURL(item).then(url => {
					setImageUrls(prev => [...prev, url]);
				});
			});
		});
	}, []);


	return (
		<div className='flex min-h-screen w-full'>
			<div className='text-center bg-white rounded-lg shadow-lg m-auto p-8'>
				{
					status === "waiting" &&
					<>
						<h1 className='text-3xl text-slate-900 my-4'>Upload your image</h1>
						<h3 className='text-xs text-slate-700 my-4'>File should be Jpeg, Png</h3>
						<form
							className='inline-block bg-[#F6F8FB] border-dashed border-2 rounded-lg p-10 w-full cursor-pointer'
							onDrop={(event) => handleImageDrop(event)}
							onDragOver={(event) => event.preventDefault()}
							onClick={() => fileRef.current.click()}
						>
							<img src="https://raw.githubusercontent.com/devchallenges/image-uploader/976cb549930ef8548206b78ee5aab0675448db55/image.svg" alt="upload-image" className='w-24 mx-auto'/>
							<h3 className='text-xs text-gray-400 mt-6'>Drag & Drop your image here</h3>
						</form>
						<p className='text-sm text-gray-300 my-4'>Or</p>
						<label htmlFor="image" className='text-white bg-blue-500 rounded-lg hover:bg-blue-600 hover:shadow-md cursor-pointer py-2 px-4 transition'>Choose a file</label>
						<input type="file" name='image' id='image' className='sr-only' ref={fileRef} onChange={(event) => uploadFile(event.target.files[0])}/>
					</>
				}
				{
					status === "uploading" &&
					<>
						<h1>Uploading...</h1>
						<div className="max-w-full w-48 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 my-2 relative">
							<div className="bg-blue-600 h-2.5 rounded-full w-[25%] transition absolute progress"></div>
						</div>
					</>
				}
				{
					status === "completed" &&
					<>
						<i className="fa-solid fa-circle-check text-green-600 text-4xl"></i>
						<h1 className='text-3xl text-slate-900 mb-4'>Uploaded succesfully!</h1>
						<img src={imageUploaded} alt="" className='rounded-2xl w-64 mx-auto'/>
						<div className='flex justify-between bg-[#F6F8FB] border-2 border-solid rounded-xl pl-3 py-1 my-3'>
							<input type="text" placeholder={imageUploaded} className="truncate" disabled/>
							<button 
								className='text-white bg-blue-500 rounded-lg hover:bg-blue-600 hover:shadow-md cursor-pointer py-2 px-4 transition'
								onClick={copyClipboard}
							>
								Copy link
							</button>
						</div>
						<button
							className='text-white bg-blue-500 rounded-lg hover:bg-blue-600 hover:shadow-md cursor-pointer py-2 px-4 transition'
							onClick={() => setStatus("waiting")}
						>
							Upload new Image
						</button>
					</>
				}
			</div>
		</div>
	)
}

export default App