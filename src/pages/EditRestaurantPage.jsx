import { useState } from 'react'
import { useParams } from 'react-router-dom'
import AddRestaurantForm from '../components/AddRestaurantForm'
import DeleteRestaurantButton from '../components/DeleteRestaurantButton'
import { useAuthContext } from '../contexts/AuthContext'

import useGetRestaurant from '../hooks/useGetRestaurant'

const EditRestaurantPage = () => {
	const { currentUser } = useAuthContext()
	const { id, collection } = useParams()

	const { data, loading } = useGetRestaurant(collection, id)

	const [toggleForm, setToggleForm] = useState(false)

	return (
		<div className="container h-screen max-w-full	 bg-darkish-blue text-contrast-color p-5">
			<h1>Redigera ett hak</h1>

			<button
				className={toggleForm
					? "p-2 m-3 border rounded border-contrast-color bg-contrast-color text-darkish-blue hover:border-contrast-color-dark hover:bg-contrast-color-dark"
					: "p-2 m-3 border rounded border-contrast-color hover:border-contrast-color-dark hover:text-contrast-color-dark"
				}
				onClick={() => setToggleForm(!toggleForm)}>Redigera hak</button>

			{toggleForm && <AddRestaurantForm
				col={collection}
				exData={data}
			/>}

			<DeleteRestaurantButton col={collection} id={id} />
		</div>
	)
}

export default EditRestaurantPage