import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteRestaurantButton = () => {
	const { id: idParams, collection: colParams } = useParams()

	const navigate = useNavigate()

	const deleteRestaurant = async () => {
		// Get reference
		const ref = doc(db, colParams, idParams)
		// Delete restaurnt
		await deleteDoc(ref)
		//Redirect
		navigate('/admin')
	}

	return (
		<button
			className="p-2 m-3 border rounded border-contrast-color bg-contrast-color text-darkish-blue hover:border-contrast-color-dark hover:bg-contrast-color-dark"
			onClick={deleteRestaurant}
		>Radera restaurang</button>
	)
}

export default DeleteRestaurantButton