import { useState } from "react";
import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore"
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext"

// Alex's lil mapping projekt
// import { inputInfo } from "../utils/inputInfo"


const AddRestaurantForm = ({ col, exData }) => {
	const [message, setMessage] = useState('')

	const { handleSubmit, register, reset } = useForm();

	const { currentUser } = useAuthContext();

	const onTest = async (data) => {
		// Post to restaurants if admin, and usertips if user
		col === 'usertips' && currentUser
			? col = 'restaurants' : null

		// Write input value to collection
		await addDoc(collection(db, col), {
			name: data.name,
			street: data.street,
			number: data.number,
			city: data.city,
			description: data.description,
			vego: data.vego,
			email: data.email,
			phone: data.phone,
			website: data.website,
			facebook: data.facebook,
			instagram: data.instagram,
			uid: currentUser ? currentUser.uid : "",
		})

		// Reset form
		reset();
		!currentUser
			? setMessage("Tack för tipset!")
			: setMessage("Restaurang uppdaterad!")
	}

	return (
		<>
			<form onSubmit={handleSubmit(onTest)} noValidate>

				{/* WORK IN PROGRESS!! Alex's lil' mapping project*/}
				{/* 
				{inputInfo.map(field => (
					<input
						key={inputInfo.indexOf(field)}
						type={field.type}
						placeholder={field.placeholder}
						defaultValue={exData ? exData.{field.name} : ''}
						{...register(`${field.name}`)}
					/>
				))} */}


				{/* Inputs in use */}
				<input
					type="text"
					placeholder="Namn"
					defaultValue={exData ? exData.name : ''}
					{...register("name")}
				/>
				<input
					type="text"
					placeholder="Gatuadress"
					defaultValue={exData ? exData.street : ''}
					{...register("street")}
				/>
				<input
					type="text"
					placeholder="Gatunummer"
					defaultValue={exData ? exData.number : ''}
					{...register("number")}
				/>
				<input
					type="text"
					placeholder="Ort"
					defaultValue={exData ? exData.city : ''}
					{...register("city")}
				/>
				<input
					type="text"
					placeholder="Beskrivning"
					defaultValue={exData ? exData.description : ''}
					{...register("description")}
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
					defaultValue={exData ? exData.email : ''}
					{...register("email")}
				/>
				<input
					type="tel"
					placeholder="Telefon"
					defaultValue={exData ? exData.phone : ''}
					{...register("phone")}
				/>
				<input
					type="url"
					placeholder="Hemsida"
					defaultValue={exData ? exData.website : ''}
					{...register("website")}
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

export default AddRestaurantForm;
