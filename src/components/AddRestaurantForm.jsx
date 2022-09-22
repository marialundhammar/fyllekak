import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuthContext } from '../contexts/AuthContext'


const AddRestaurantForm = ({ col, exData }) => {
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
					defaultValue={exData ? exData.namn : ''}
					{...register("namn")}
				/>
				<input
					type="text"
					placeholder="Gatuadress"
					defaultValue={exData ? exData.adress : ''}
					{...register("adress")}
				/>
				<input
					type="text"
					placeholder="Ort"
					defaultValue={exData ? exData.ort : ''}
					{...register("ort")}
				/>
				<input
					type="text"
					placeholder="Beskrivning"
					defaultValue={exData ? exData.beskrivning : ''}
					{...register("beskrivning")}
				/>
				<input
					type="text"
					placeholder="Vegetariskt"
					defaultValue={exData ? exData.vego : ''}
					{...register("vego")}
				/>
				<input
					type="email"
					placeholder="E-Post"
					defaultValue={exData ? exData.epost : ''}
					{...register("epost")}
				/>
				<input
					type="tel"
					placeholder="Telefon"
					defaultValue={exData ? exData.telefon : ''}
					{...register("telefon")}
				/>
				<input
					type="url"
					placeholder="Hemsida"
					defaultValue={exData ? exData.hemsida : ''}
					{...register("hemsida")}
				/>
				<input
					type="url"
					placeholder="Facebook"
					defaultValue={exData ? exData.facebook : ''}
					{...register("facebook")}
				/>
				<input
					type="url"
					placeholder="Instagram"
					defaultValue={exData ? exData.instagram : ''}
					{...register("instagram")}
				/>
				<input type="submit" />
			</form>
			{message && <h3>{message}</h3>}
		</>
	)
}

export default AddRestaurantForm