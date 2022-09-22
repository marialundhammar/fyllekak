import { useState } from "react";
import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";

const AddRestaurantForm = ({ col }) => {
  const [message, setMessage] = useState("");

  const { handleSubmit, register, reset } = useForm();

  const { currentUser } = useAuthContext();

  const onTest = async (data) => {
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
    });

    // Reset form
    reset();
    setMessage("Tack för tipset!");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onTest)} noValidate>
        <input type="text" placeholder="Namn" {...register("name")} />
        <input type="text" placeholder="Street" {...register("street")} />
        <input type="number" placeholder="Number" {...register("number")} />
        <input type="text" placeholder="City" {...register("city")} />
        <input type="text" placeholder="Beskrivning" {...register("description")} />
        <input type="text" placeholder="Vegetariskt" {...register("vego")} />
        <input type="email" placeholder="E-Post" {...register("email")} />
        <input type="tel" placeholder="Telefon" {...register("phone")} />
        <input type="url" placeholder="Hemsida" {...register("website")} />
        <input type="url" placeholder="Facebook" {...register("facebook")} />
        <input type="url" placeholder="Instagram" {...register("instagram")} />
        <input type="submit" />
      </form>
      {message && <h3>{message}</h3>}
    </>
  );
};

export default AddRestaurantForm;
