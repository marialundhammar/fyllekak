import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'

const AddRestaurantForm = () => {
	// const [message, setMessage] = useState('')

	const { handleSubmit, register, reset } = useForm()

	const onTest = async (data) => {
		// data.preventDefault()

		await addDoc(collection(db, 'restaurants'), {
			name: data.name
		})

		reset()
	}


	return (
		<form onSubmit={handleSubmit(onTest)} noValidate>
			<input
				type="text"
				placeholder="test input"
				{...register("name")}
			/>
			<input type="submit" />
		</form>
	)
}

export default AddRestaurantForm