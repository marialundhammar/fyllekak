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
		<button onClick={deleteRestaurant}>Delete</button>
	)
}

export default DeleteRestaurantButton