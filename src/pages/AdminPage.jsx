import { useState } from 'react'
import AddRestaurantForm from '../components/AddRestaurantForm'
import Table from '../components/Table'
import { useAuthContext } from '../contexts/AuthContext'
import useRestaurants from '../hooks/useRestaurants'

const AdminPage = () => {
	const { currentUser } = useAuthContext()
	const restaurants = useRestaurants()

	const [toggleForm, setToggleForm] = useState(false)

	return (
		<div>
			<h1>Admin Page</h1>

			<p>Inloggad användare: {currentUser.email}</p>

			<button onClick={() => setToggleForm(!toggleForm)}>Show add hak form</button>

			{toggleForm && <AddRestaurantForm
				col={'restaurants'}
			/>}

			<Table restaurants={restaurants} />
		</div>
	)
}

export default AdminPage