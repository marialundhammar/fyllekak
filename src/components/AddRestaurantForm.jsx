import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'

const AddRestaurantForm = () => {

	const { handleSubmit, register, reset } = useForm()

	const onTest = async (data) => {

		// Write input value to collection
		await addDoc(collection(db, 'restaurants'), {
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
		})

		reset()
	}


	return (
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
				type="text"
				placeholder="E-Post"
				{...register("epost")}
			/>
			<input
				type="text"
				placeholder="Telefon"
				{...register("telefon")}
			/>
			<input
				type="text"
				placeholder="Hemsida"
				{...register("hemsida")}
			/>
			<input
				type="text"
				placeholder="Facebook"
				{...register("facebook")}
			/>
			<input
				type="text"
				placeholder="Instagram"
				{...register("instagram")}
			/>
			<input type="submit" />
		</form>
	)
}

export default AddRestaurantForm