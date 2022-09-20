import { useState } from 'react'
import AddRestaurantForm from '../components/AddRestaurantForm'
import { useAuthContext } from '../contexts/AuthContext'


const AdminPage = () => {
	const { currentUser } = useAuthContext()

	const [toggleForm, setToggleForm] = useState(false)

	return (
		<div>
			<h1>Admin Page</h1>

			<p>Inloggad användare: {currentUser.email}</p>

			<button onClick={() => setToggleForm(!toggleForm)}>Show add hak form</button>

			{toggleForm && <AddRestaurantForm
				col={'restaurants'}
			/>}
		</div>
	)
}

export default AdminPage