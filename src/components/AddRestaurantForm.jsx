import { useState } from "react"
import { useForm } from "react-hook-form";
import { doc, addDoc, collection, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { useAuthContext } from "../contexts/AuthContext"
import MapsAPI from "../services/MapsAPI"
import useGetCoords from "../hooks/useGetCoords"

const AddRestaurantForm = ({ col, exData }) => {
	const [message, setMessage] = useState("")

	const { handleSubmit, register, reset } = useForm({
		defaultValues: {
			checkbox: false,
		}
	})
	const { currentUser } = useAuthContext()

	const updateToDoc = async (fetchCoords, formData, closing_time) => {
		if (fetchCoords.status === "OK") {
			// Update restaurant to input value
			await updateDoc(doc(db, 'restaurants', exData.id), {
				name: formData.name,
				street: formData.street,
				number: formData.number,
				city: formData.city,
				description: formData.description,
				vego: formData.vego,

				price: formData.price,

				closing_time: closing_time,

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

	const addToDoc = async (fetchCoords, formData, closing_time) => {
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

				price: formData.price,

				closing_time: closing_time,

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

		const closing_time = {
			mon: formData.mon,
			tue: formData.tue,
			wed: formData.wed,
			thu: formData.thu,
			fri: formData.fri,
			sat: formData.sat,
			sun: formData.sun
		}

		if (exData) {
			await updateToDoc(fetchCoords, formData, closing_time)
		} else {
			await addToDoc(fetchCoords, formData, closing_time)
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

				<label>
					<input
						type="checkbox"
						{...register("vego")}
					// checked={exData.vego ? true : false}
					/>Vegetariskt
				</label>

				<label>Prisklass (1 = Billigt, 3 = Dyrt)
					<input
						{...register("price", { required: true, max: 3, min: 1, message: "Välj prisklass" })}
						type="number"
						defaultValue={exData ? exData.price[1] : ""}
					/>
				</label>

				<div className="closing_time">
					<h3>Stänger:</h3>
					<label>Måndag
						<input
							type="time"
							{...register("mon")}
							defaultValue={exData ? exData.closing_time.mon : ""}
						/>
					</label>
					<label>Tisdag
						<input
							type="time"
							{...register("tue")}
							defaultValue={exData ? exData.closing_time.tue : ""}
						/>
					</label>
					<label>Onsdag
						<input
							type="time"
							{...register("wed")}
							defaultValue={exData ? exData.closing_time.wed : ""}
						/>
					</label>
					<label>Torsdag
						<input
							type="time"
							{...register("thu")}
							defaultValue={exData ? exData.closing_time.thu : ""}
						/>
					</label>
					<label>Fredag
						<input
							type="time"
							{...register("fri")}
							defaultValue={exData ? exData.closing_time.fri : ""}
						/>
					</label>
					<label>Lördag
						<input
							type="time"
							{...register("sat")}
							defaultValue={exData ? exData.closing_time.sat : ""}
						/>
					</label>
					<label>Söndag
						<input
							type="time"
							{...register("sun")}
							defaultValue={exData ? exData.closing_time.sun : ""}
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
