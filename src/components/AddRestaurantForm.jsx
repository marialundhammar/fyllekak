import { useState } from "react"
import { useForm } from "react-hook-form"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../firebase"
import { useAuthContext } from "../contexts/AuthContext"
import MapsAPI from "../services/MapsAPI"
import useGetCoords from "../hooks/useGetCoords"

// Alex's lil mapping projekt
// import { inputInfo } from "../utils/inputInfo"

const AddRestaurantForm = ({ col, exData }) => {
  const [message, setMessage] = useState("")

  const { handleSubmit, register, reset } = useForm()

  const { currentUser } = useAuthContext()

  const addToDoc = (fetchCoords, formData) => {
    // Write input value to collection
    if (fetchCoords.status === "OK") {
      addDoc(collection(db, col), {
        name: formData.name,
        street: formData.street,
        number: formData.number,
        city: formData.city,
        description: formData.description,
        vego: formData.vego,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        facebook: formData.facebook,
        instagram: formData.instagram,
        uid: currentUser ? currentUser.uid : "",
        coords: fetchCoords.results[0].geometry.location,
      })
    } else {
      console.log("sorry dude not a valid address")
    }

    // Reset form
    reset()
    !currentUser
      ? setMessage("Tack för tipset!")
      : setMessage("Restaurang uppdaterad!")
  }

  const onSubmit = async (formData) => {
    // Post to restaurants if admin, and u	sertips if user
    col === "usertips" && currentUser ? (col = "restaurants") : null

    console.log(formData)

    const fetchCoords = await useGetCoords(
      formData.street + "+" + formData.number + "+" + formData.city
    )

    await addToDoc(fetchCoords, formData)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
          defaultValue={exData ? exData.name : ""}
          {...register("name")}
        />
        <input
          type="text"
          placeholder="Gatuadress"
          defaultValue={exData ? exData.street : ""}
          {...register("street")}
        />
        <input
          type="text"
          placeholder="Gatunummer"
          defaultValue={exData ? exData.number : ""}
          {...register("number")}
        />
        <input
          type="text"
          placeholder="Ort"
          defaultValue={exData ? exData.city : ""}
          {...register("city")}
        />
        <input
          type="text"
          placeholder="Beskrivning"
          defaultValue={exData ? exData.description : ""}
          {...register("description")}
        />
        <input
          type="text"
          placeholder="Vegetariskt"
          defaultValue={exData ? exData.vego : ""}
          {...register("vego")}
        />
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
