import { useState } from "react"
import { useForm } from "react-hook-form";
import { doc, addDoc, collection, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { useAuthContext } from "../contexts/AuthContext"
import MapsAPI from "../services/MapsAPI"
import useGetCoords from "../hooks/useGetCoords"

const AddRestaurantForm = ({ col, exData }) => {
	const [message, setMessage] = useState("")

	const { handleSubmit, register, reset } = useForm()
	const { currentUser } = useAuthContext()

	const updateToDoc = async (fetchCoords, formData) => {
		if (fetchCoords.status === "OK") {
			// Update restaurant to input value
			await updateDoc(doc(db, 'restaurants', exData.id), {
				name: formData.name,
				street: formData.street,
				number: formData.number,
				city: formData.city,
				description: formData.description,
				vego: formData.vego,

				type: formData.type,

				mon: formData.closing_time[0],
				tue: formData.closing_time[1],
				wed: formData.closing_time[2],
				thu: formData.closing_time[3],
				fri: formData.closing_time[4],
				sat: formData.closing_time[5],
				sun: formData.closing_time[6],

				email: formData.email,
				phone: formData.phone,
				website: formData.website,
				facebook: formData.facebook,
				instagram: formData.instagram,
				uid: currentUser ? currentUser.uid : "",
				coords: fetchCoords.results[0].geometry.location,
			})
			// Reset form
			reset()
			setMessage("Restaurang uppdaterad!")
			return
		}
		else {
			console.log("sorry mannen not a valid address")
		}
	}

	const addToDoc = async (fetchCoords, formData) => {
		// Post to restaurants if admin, and u	sertips if user
		col === 'usertips' && currentUser
			? col = 'restaurants' : null

		if (fetchCoords.status === "OK") {
			// Write input value to collection
			await addDoc(collection(db, col), {
				name: formData.name,
				street: formData.street,
				number: formData.number,
				city: formData.city,
				description: formData.description,
				vego: formData.vego,

				type: formData.type,

				mon: formData.closing_time[0],
				tue: formData.closing_time[1],
				wed: formData.closing_time[2],
				thu: formData.closing_time[3],
				fri: formData.closing_time[4],
				sat: formData.closing_time[5],
				sun: formData.closing_time[6],

				email: formData.email,
				phone: formData.phone,
				website: formData.website,
				facebook: formData.facebook,
				instagram: formData.instagram,
				uid: currentUser ? currentUser.uid : "",
				coords: fetchCoords.results[0].geometry.location,
			})
		}
		// Reset form & set message
		reset()
		!currentUser
			? setMessage("Tack för tipset!")
			: setMessage("Restaurang tillagd!")
	}

	const onSubmit = async (formData) => {
		const fetchCoords = await useGetCoords(
			formData.street + "+" + formData.number + "+" + formData.city
		)
		if (exData) {
			await updateToDoc(fetchCoords, formData)
		} else {
			await addToDoc(fetchCoords, formData)
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<input
					type="text"
					placeholder="Namn"
					defaultValue={exData ? exData.name : ""}
					{...register("name", { required: true })}
				/>
				<input
					type="text"
					placeholder="Gatuadress"
					defaultValue={exData ? exData.street : ""}
					{...register("street", { required: true })}
				/>
				<input
					type="text"
					placeholder="Gatunummer"
					defaultValue={exData ? exData.number : ""}
					{...register("number", { required: true })}
				/>
				<input
					type="text"
					placeholder="Ort"
					defaultValue={exData ? exData.city : ""}
					{...register("city", { required: true })}
				/>
				<input
					type="text"
					placeholder="Beskrivning"
					defaultValue={exData ? exData.description : ""}
					{...register("description", { required: true })}
				/>
				<input
					type="text"
					placeholder="Vegetariskt"
					defaultValue={exData ? exData.vego : ""}
					{...register("vego", { required: true })}
				/>

				<div>
					<label htmlFor="snabbmat">
						<input
							{...register("type", { required: true })}
							type="radio"
							value="snabbmat"
							id="snabbmat"
						/>
						Snabbmat
					</label>
					<label htmlFor="grill">
						<input
							{...register("type", { required: true })}
							type="radio"
							value="grill"
							id="grill"
						/>
						Grill
					</label>
					<label htmlFor="foodtruck">
						<input
							{...register("type", { required: true })}
							type="radio"
							value="foodtruck"
							id="foodtruck"
						/>
						Foodtruck
					</label>
				</div>

				<div>
					<label>Måndag
						<input
							type="time"
							{...register("closing_time[0]")}
						/>
					</label>
					<label>Tisdag
						<input
							type="time"
							{...register("closing_time[1]")}
						/>
					</label>
					<label>Onsdag
						<input
							type="time"
							{...register("closing_time[2]")}
						/>
					</label>
					<label>Torsdag
						<input
							type="time"
							{...register("closing_time[3]")}
						/>
					</label>
					<label>Fredag
						<input
							type="time"
							{...register("closing_time[4]")}
						/>
					</label>
					<label>Lördag
						<input
							type="time"
							{...register("closing_time[5]")}
						/>
					</label>
					<label>Söndag
						<input
							type="time"
							{...register("closing_time[6]")}
						/>
					</label>
				</div>

				<input
					type="email"
					placeholder="E-Post"
					defaultValue={exData ? exData.email : ""}
					{...register("email")}
				/>
				<input
					type="tel"
					placeholder="Telefon"
					defaultValue={exData ? exData.phone : ""}
					{...register("phone")}
				/>
				<input
					type="url"
					placeholder="Hemsida"
					defaultValue={exData ? exData.website : ""}
					{...register("website")}
				/>
				<input
					type="url"
					placeholder="Facebook"
					defaultValue={exData ? exData.facebook : ""}
					{...register("facebook")}
				/>
				<input
					type="url"
					placeholder="Instagram"
					defaultValue={exData ? exData.instagram : ""}
					{...register("instagram")}
				/>
				<input type="submit" />
			</form>
			{message && <h3>{message}</h3>}
		</>
	)
}

export default AddRestaurantForm
