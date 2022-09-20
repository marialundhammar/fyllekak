import { useState } from 'react'
import AddRestaurantForm from '../components/AddRestaurantForm'
import Table from '../components/Table'
import { useAuthContext } from '../contexts/AuthContext'
import useRestaurants from '../hooks/useRestaurants'
import useUserTips from '../hooks/useUsertips'

const AdminPage = () => {
	const { currentUser } = useAuthContext()
	const restaurants = useRestaurants()
	const userTips = useUserTips()

	const [toggleForm, setToggleForm] = useState(false)

	return (
		<div>
			<h1>Admin Page</h1>

			<p>Inloggad användare: {currentUser.email}</p>

			<button onClick={() => setToggleForm(!toggleForm)}>Show add hak form</button>

			{toggleForm && <AddRestaurantForm
				col={'restaurants'}
			/>}

			<h1 className="py-8 px-4 text-3xl">Lista på Restauranger</h1>

			<Table restaurants={restaurants} />

			<h1 className="py-8 px-4 text-3xl">Lista på Användar tips</h1>

			<Table restaurants={userTips} />
		</div>
	)
}

export default AdminPage