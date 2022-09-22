import { useRef, useState } from 'react'
// import { useForm } from 'react-hook-form'
import { useAuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'




const LoginPage = () => {
	const emailRef = useRef(null)
	const passwordRef = useRef(null)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const { login } = useAuthContext()

	// const { handleSubmit, register, reset, getValues } = useForm()

	const handleLogin = async (e) => {
		e.preventDefault()
		setError(null)
		try {
			setLoading(true)
			await login(emailRef.current.value, passwordRef.current.value)
			navigate('/admin')
		} catch (err) {
			console.log(err)
			setError(err.message)
			setLoading(false)
		}
	}

	return (
		<div>
			<h2>Admin login</h2>

			{error && (<h3>Error: {error}</h3>)}
			{loading && (<h3>Loading...</h3>)}

			<form onSubmit={handleLogin} noValidate>
				<input
					type="email"
					placeholder="E-post"
					ref={emailRef}
				/>
				<input
					type="password"
					placeholder="Lösenord"
					ref={passwordRef}
				/>
				<input type="submit" />
			</form>
		</div>
	)
}

export default LoginPage