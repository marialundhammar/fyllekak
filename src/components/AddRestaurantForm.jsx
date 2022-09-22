import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuthContext } from '../contexts/AuthContext'


const AddRestaurantForm = ({ col }) => {
	const [message, setMessage] = useState('')

	const { handleSubmit, register, reset } = useForm()

	const { currentUser } = useAuthContext()

	const onTest = async (data) => {
		// Write input value to collection
		await addDoc(collection(db, col), {
			namn: data.namn,
			adress: data.adress,
			ort: data.ort,
			beskrivning: data.beskrivning,
			vego: data.vego,
			epost: data.epost,
			telefon: data.telefon,
			hemsida: data.hemsida,
			facebook: data.facebook,
			instagram: data.instagram,
			uid: currentUser ? currentUser.uid : '',
		})

		// Reset form
		reset()
		setMessage('Tack för tipset!')
	}

	return (
		<>
			<form onSubmit={handleSubmit(onTest)} noValidate>
				<input
					type="text"
					placeholder="Namn"
					{...register("namn")}
				/>
				<input
					type="text"
					placeholder="Gatuadress"
					{...register("adress")}
				/>
				<input
					type="text"
					placeholder="Ort"
					{...register("ort")}
				/>
				<input
					type="text"
					placeholder="Beskrivning"
					{...register("beskrivning")}
				/>
				<input
					type="text"
					placeholder="Vegetariskt"
					{...register("vego")}
				/>
				<input
					type="email"
					placeholder="E-Post"
					{...register("epost")}
				/>
				<input
					type="tel"
					placeholder="Telefon"
					{...register("telefon")}
				/>
				<input
					type="url"
					placeholder="Hemsida"
					{...register("hemsida")}
				/>
				<input
					type="url"
					placeholder="Facebook"
					{...register("facebook")}
				/>
				<input
					type="url"
					placeholder="Instagram"
					{...register("instagram")}
				/>
				<input type="submit" />
			</form>
			{message && <h3>{message}</h3>}
		</>
	)
}

export default AddRestaurantForm