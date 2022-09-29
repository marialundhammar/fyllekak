import { useRef } from 'react'
import { useAuthContext } from '../contexts/AuthContext'

const UpdatdeProfilePage = () => {
	const emailRef = useRef()
	const photoRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const [photo, setPhoto] = useState(null)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(null)

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
		e.preventDefault()

		if (passwordRef.current.value !== passwordConfirmRef) {
			return setError("")
		}

		setError(null)

		try {
			setLoading(true)

			if (photo) {
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
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<div>
					<img for="photo-upload" src={src} />
					<input id="photo-upload" type="file" onChange={handleFileChange} />
				</div>

				<input
					type="email"
					placeholder="Email"
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