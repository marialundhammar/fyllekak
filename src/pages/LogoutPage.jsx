import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const LogoutPage = () => {
	const navigate = useNavigate()
	const { logout } = useAuthContext()

	useEffect(() => {
		const logoutUser = async () => {
			await logout()
			navigate('/')
		}
		logoutUser()
	}, [])

	return (
		<div>
			<h1>Please wait while you are being logged out...</h1>
		</div>
	)
}

export default LogoutPage
