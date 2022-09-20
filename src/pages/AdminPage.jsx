import { useState } from 'react'
import AddRestaurantForm from '../components/AddRestaurantForm'
import { useAuthContext } from '../contexts/AuthContext'


const AdminPage = () => {
	const { currentUser } = useAuthContext()

	const [toggleForm, setToggleForm] = useState(false)

	console.log(currentUser)

	return (
		<div>
			<h1>Admin Page</h1>

			<p>Inloggad användare: {currentUser}</p>

			<button onClick={() => setToggleForm(!toggleForm)}>Show add form</button>

			{toggleForm && <AddRestaurantForm />}
		</div>
	)
}

export default AdminPage