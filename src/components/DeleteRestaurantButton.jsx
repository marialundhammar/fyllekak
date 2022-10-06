import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom'


const DeleteRestaurantButton = ({ col, id }) => {
	const navigate = useNavigate()

	const deleteRestaurant = async () => {
		const ref = doc(db, col, id)
		await deleteDoc(ref)

		navigate('/admin')
	}

	return (
		<button
			className="p-2 m-3 border rounded border-contrast-color bg-contrast-color text-darkish-blue hover:border-contrast-color-dark hover:bg-contrast-color-dark"
			onClick={deleteRestaurant}
		>Delete</button>
	)
}

export default DeleteRestaurantButton