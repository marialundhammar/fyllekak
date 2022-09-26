import { useState } from 'react'
import { useParams } from 'react-router-dom'
import AddRestaurantForm from '../components/AddRestaurantForm'
import { useAuthContext } from '../contexts/AuthContext'

import useGetRestaurant from '../hooks/useGetRestaurant'

const EditRestaurantPage = () => {
	const { currentUser } = useAuthContext()
	const { id } = useParams()

	const { data, loading } = useGetRestaurant(id)

	const [toggleForm, setToggleForm] = useState(false)

	return (
		<div>
			<h1>Edit Restarurant Page</h1>

			<p>Inloggad användare: {currentUser.email}</p>

			<button onClick={() => setToggleForm(!toggleForm)}>Show edit hak form</button>

			{toggleForm && <AddRestaurantForm
				col={'restaurants'}
				exData={data}
			/>}
		</div>
	)
}

export default EditRestaurantPage