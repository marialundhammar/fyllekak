import { useState } from 'react'
import { useParams } from 'react-router-dom'
import AddRestaurantForm from '../components/AddRestaurantForm'
import { useAuthContext } from '../contexts/AuthContext'

import useGetUsertip from '../hooks/useGetUsertip'

const EditUsertipPage = () => {
	const { currentUser } = useAuthContext()
	const { id } = useParams()

	const { data, loading } = useGetUsertip(id)

	const [toggleForm, setToggleForm] = useState(false)

	return (
		<div>
			<h1>Edit Restarurant Page</h1>

			<p>Inloggad användare: {currentUser.email}</p>

			<button onClick={() => setToggleForm(!toggleForm)}>Show edit hak form</button>

			{toggleForm && <AddRestaurantForm
				col={'usertips'}
				exData={data}
			/>}
		</div>
	)
}

export default EditUsertipPage