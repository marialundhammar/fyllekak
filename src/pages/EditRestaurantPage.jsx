import { useEffect, useState } from 'react'
import AddRestaurantForm from '../components/AddRestaurantForm'
import { useAuthContext } from '../contexts/AuthContext'

import useRestaurants from '../hooks/useRestaurants'


const AdminPage = () => {
	const { currentUser } = useAuthContext()

	const resQuery = useRestaurants()

	const [toggleForm, setToggleForm] = useState(false)

	useEffect(() => {

	})

	return (
		<div>
			<h1>Edit Restarurant Page</h1>

			<p>Inloggad användare: {currentUser.email}</p>

			<button onClick={() => setToggleForm(!toggleForm)}>Show edit hak form</button>

			{toggleForm && <AddRestaurantForm
				col={'restaurants'}
				exData={resQuery}
			/>}
		</div>
	)
}

export default AdminPage