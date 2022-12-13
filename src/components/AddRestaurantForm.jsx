import { useState } from "react";
import { useForm } from "react-hook-form";
import { doc, addDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";
import useGetCoords from "../hooks/useGetCoords";

const AddRestaurantForm = ({ col, exData }) => {
  const [message, setMessage] = useState("");
  const { currentUser } = useAuthContext();

  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      checkbox: false,
    },
  });

  const updateToDoc = async (fetchCoords, formData, closing_time) => {
    if (fetchCoords.status === "OK") {
      try {
        await updateDoc(doc(db, "restaurants", exData.id), {
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
        });
      } catch (err) {
        console.log(err.message);
      }
    } else {
      setMessage("Ogiltig adress");
    }
    // Reset form
    reset();
    setMessage("Restaurang uppdaterad!");
  };

  const addToDoc = async (fetchCoords, formData, closing_time) => {
    // Post to restaurants if admin, and u	sertips if user
    col === "usertips" && currentUser ? (col = "restaurants") : null;

    if (fetchCoords.status === "OK") {
      try {
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
        });
      } catch (err) {
        console.log(err.message);
      }
      reset();
      !currentUser
        ? setMessage("Tack för tipset!")
        : setMessage("Restaurang tillagd!");
    } else {
      setMessage("Ogiltig adress!");
    }
  };

  const onSubmit = async (formData) => {
    const fetchCoords = await useGetCoords(
      formData.street + "+" + formData.number + "+" + formData.city
    );

    const closing_time = {
      mon: formData.mon,
      tue: formData.tue,
      wed: formData.wed,
      thu: formData.thu,
      fri: formData.fri,
      sat: formData.sat,
      sun: formData.sun,
    };

    if (exData && col === "restaurants") {
      await updateToDoc(fetchCoords, formData, closing_time);
    } else {
      await addToDoc(fetchCoords, formData, closing_time);
    }
  };

  return (
    <>
      <form
        className="m-3 flex flex-col sm:flex-row sm:flex-wrap"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="sm:mx-2 flex flex-col sm:w-5/12 md:w-3/12">
          <input
            className="my-2 p-1 bg-darkish-blue border rounded border-nav"
            type="text"
            placeholder="Namn"
            defaultValue={exData ? exData.name : ""}
            {...register("name", { required: true })}
          />
          <div className="flex flex-row justify-between">
            <input
              className="w-5/12 p-1 bg-darkish-blue border rounded border-nav"
              type="text"
              placeholder="Gatuadress"
              defaultValue={exData ? exData.street : ""}
              {...register("street", { required: true })}
            />
            <input
              className="w-5/12 p-1 bg-darkish-blue border rounded border-nav"
              type="text"
              placeholder="Gatunummer"
              defaultValue={exData ? exData.number : ""}
              {...register("number", { required: true })}
            />
          </div>
          <input
            className="my-2 p-1 bg-darkish-blue border rounded border-nav"
            type="text"
            placeholder="Ort"
            defaultValue={exData ? exData.city : ""}
            {...register("city", { required: true })}
          />
          <input
            className="my-2 p-1 bg-darkish-blue border rounded border-nav"
            type="text"
            placeholder="Beskrivning"
            defaultValue={exData ? exData.description : ""}
            {...register("description", { required: true })}
          />
        </div>

        <div className="sm:mx-2 py-2 file:flex flex-col sm:w-5/12 md:w-3/12">
          <div className="flex flex-row justify-around">
            <div className="flex flex-row">
              <input type="checkbox" {...register("vego")} />
              <label>Vegetariskt</label>
            </div>
            <div className="flex flex-row">
              <input type="checkbox" {...register("price")} />
              <label>Billigt</label>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-xl">Stänger:</h3>

            <div className="flex flex-row flex-wrap">
              <div className="w-2/5 flex flex-row justify-around">
                <label className="text-sm">Mån</label>
                <input
                  className="bg-darkish-blue hover:text-contrast-color-dark"
                  type="time"
                  defaultValue={exData ? exData.closing_time.mon : ""}
                  {...register("mon")}
                />
              </div>
              <div className="w-2/5 flex flex-row justify-around">
                <label className="text-sm">Tis</label>
                <input
                  className="bg-darkish-blue hover:text-contrast-color-dark"
                  type="time"
                  defaultValue={exData ? exData.closing_time.tue : ""}
                  {...register("tue")}
                />
              </div>
              <div className="w-2/5 flex flex-row justify-around">
                <label className="text-sm">Ons</label>
                <input
                  className="bg-darkish-blue hover:text-contrast-color-dark"
                  type="time"
                  defaultValue={exData ? exData.closing_time.wed : ""}
                  {...register("wed")}
                />
              </div>
              <div className="w-2/5 flex flex-row justify-around">
                <label className="text-sm">Tors</label>
                <input
                  className="bg-darkish-blue hover:text-contrast-color-dark"
                  type="time"
                  defaultValue={exData ? exData.closing_time.thu : ""}
                  {...register("thu")}
                />
              </div>
              <div className="w-2/5 flex flex-row justify-around">
                <label className="text-sm">Fre</label>
                <input
                  className="bg-darkish-blue hover:text-contrast-color-dark"
                  type="time"
                  defaultValue={exData ? exData.closing_time.fri : ""}
                  {...register("fri")}
                />
              </div>
              <div className="w-2/5 flex flex-row justify-around">
                <label className="text-sm">Lör</label>
                <input
                  className="bg-darkish-blue hover:text-contrast-color-dark"
                  type="time"
                  defaultValue={exData ? exData.closing_time.sat : ""}
                  {...register("sat")}
                />
              </div>
              <div className="w-2/5 flex flex-row justify-around">
                <label className="text-sm">Sön</label>
                <input
                  className="bg-darkish-blue hover:text-contrast-color-dark"
                  type="time"
                  defaultValue={exData ? exData.closing_time.sun : ""}
                  {...register("sun")}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="sm:mx-2 flex flex-col sm:w-5/12 md:w-3/12">
          <input
            className="my-2 p-1 bg-darkish-blue border rounded border-nav"
            type="email"
            placeholder="E-Post"
            defaultValue={exData ? exData.email : ""}
            {...register("email")}
          />
          <input
            className="my-2 p-1 bg-darkish-blue border rounded border-nav"
            type="tel"
            placeholder="Telefon"
            defaultValue={exData ? exData.phone : ""}
            {...register("phone")}
          />
          <input
            className="my-2 p-1 bg-darkish-blue border rounded border-nav"
            type="url"
            placeholder="Hemsida"
            defaultValue={exData ? exData.website : ""}
            {...register("website")}
          />
          <input
            className="my-2 p-1 bg-darkish-blue border rounded border-nav"
            type="url"
            placeholder="Facebook"
            defaultValue={exData ? exData.facebook : ""}
            {...register("facebook")}
          />
          <input
            className="my-2 p-1 bg-darkish-blue border rounded border-nav"
            type="url"
            placeholder="Instagram"
            defaultValue={exData ? exData.instagram : ""}
            {...register("instagram")}
          />
          <input
            className="p-2 my-3 border rounded border-contrast-color bg-contrast-color text-darkish-blue hover:border-contrast-color-dark hover:bg-contrast-color-dark"
            type="submit"
          />
        </div>
      </form>
      {message && <h3 className="text-1xl text-red ">{message}</h3>}
    </>
  );
};

export default AddRestaurantForm;
