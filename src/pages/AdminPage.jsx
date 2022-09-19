import React from 'react'
import AddRestaurantForm from '../components/AddRestaurantForm'
import { useAuthContext } from '../contexts/AuthContext'


const AdminPage = () => {
	const { currentUser } = useAuthContext()

	return (
		<div>
			<p>Inloggad användare: {currentUser.email}</p>

			<AddRestaurantForm />
		</div>
	)
}

export default AdminPage