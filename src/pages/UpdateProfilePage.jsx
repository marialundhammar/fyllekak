import { useRef, useState } from 'react'
import { useForm } from "react-hook-form";

import { useAuthContext } from '../contexts/AuthContext'

const UpdatdeProfilePage = () => {
	const emailRef = useRef()
	const photoRef = useRef()
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

	const onSubmit = async (e) => {
		console.log(emailRef)
		// e.preventDefault()

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("")
		}

		setError(null)

		try {
			console.log("inne i try")
			setLoading(true)

			if (photo) {
				console.log(photo)
				await setProfilePicture(photo)
			}


			console.log("mellan photo och email")

			if (emailRef.current.value !== currentUser.email) {
				await setEmail(emailRef.current.value)
			}

			console.log("efter if-sats emailRef")

			console.log(passwordRef)

			if (passwordRef.current.value) {
				await setPassword(passwordRef.current.value)
			}

			console.log("efter if-sats passwordRef")


			await reloadUser()
			setLoading(false)

		} catch (e) {
			setError(e.message)
			setLoading(false)
		}
	}

	return (
		<>
			<h1>Update Profile Page</h1>

			<p>Inloggad användare: {currentUser.email}</p>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<img src={currentUser.photoURL} />
					<input id="photo-upload" type="file" onChange={handleFileChange} />
				</div>

				<input
					type="email"
					// name="email"
					placeholder="Email"
					// {...rest}
					ref={emailRef}
				/>
				<input
					type="password"
					placeholder="Nytt lösenord"
					ref={passwordRef}
				/>
				<input
					type="password"
					placeholder="Bekräfta lösenord"
					ref={passwordConfirmRef}
				/>
				<input type="submit" />
			</form>
		</>
	)
}

export default UpdatdeProfilePage