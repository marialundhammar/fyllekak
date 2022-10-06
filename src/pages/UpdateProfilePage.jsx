import { useRef, useState } from 'react'
import { useForm } from "react-hook-form"
import { doc, addDoc, collection, updateDoc } from "firebase/firestore"
import { db } from "../firebase"

import { useAuthContext } from '../contexts/AuthContext'

const UpdateProfilePage = () => {
	const emailRef = useRef()
	const nameRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const [photo, setPhoto] = useState(null)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(null)


	const { handleSubmit, register, reset } = useForm()

	const {
		currentUser,
		reloadUser,
		setProfilePicture,
		setEmail,
		setPassword
	} = useAuthContext()

	const handleFileChange = (e) => {
		if (!e.target.files.length) {
			setPhoto(null)
			return
		}
		setPhoto(e.target.files[0])
	}

	const onSubmit = async (formData) => {
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("")
		}

		setError(null)

		try {
			setLoading(true)
			if (photo) {
				console.log(photo)
				await setProfilePicture(photo)
			}
			if (emailRef.current.value !== currentUser.email) {
				await setEmail(emailRef.current.value)
			}
			if (passwordRef.current.value) {
				await setPassword(passwordRef.current.value)
			}
			await reloadUser()
			setLoading(false)
		} catch (e) {
			setError(e.message)
			setLoading(false)
		}

		await updateDoc(doc(db, 'admin',), {
			name: formData.name,
			email: formData.email,
		})

	}


	return (
		<>
			<div className="bg-darkish-blue text-contrast-color h-screen flex flex-col items-center">
				<div className="flex flex-col sm:flex-row justify-between py-3">
					<h1 className="font-medium text-3xl p-3">Uppdatera profil</h1>
				</div>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="my-3 flex flex-col items-center">
						<div className="w-20 h-20">
							<img src={currentUser.photoURL} />
						</div>
						<input
							type="file"
							id="photo-upload"
							onChange={handleFileChange}
							{...register("img")}
						/>
					</div>

					<div className="my-3 flex flex-col">
						<input
							className="my-2 p-1 bg-darkish-blue border rounded border-nav"
							type="text"
							placeholder="Namn"
							{...register("name")}
							ref={nameRef}
						/>
						<input
							className="my-2 p-1 bg-darkish-blue border rounded border-nav"
							type="email"
							placeholder="Email"
							{...register("email")}
							ref={emailRef}
						/>
						<input
							className="my-2 p-1 bg-darkish-blue border rounded border-nav"
							type="password"
							placeholder="Nytt lösenord"
							ref={passwordRef}
						/>
						<input
							className="my-2 p-1 bg-darkish-blue border rounded border-nav"
							type="password"
							placeholder="Bekräfta lösenord"
							ref={passwordConfirmRef}
						/>
						<input className="p-2 my-3 border rounded border-contrast-color bg-contrast-color text-darkish-blue hover:border-contrast-color-dark hover:bg-contrast-color-dark" type="submit" />
					</div>
				</form>
			</div>
		</>
	)
}

export default UpdateProfilePage