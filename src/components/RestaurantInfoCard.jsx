import React from 'react'

const RestaurantInfoCard = ({ restaurant }) => {
    console.log('restaurant ==>', restaurant)

    return (
        <div className="border-2 border-blue-800 bg-blue-400 w-1/2 rounded-xl">
            <div className="flex justify-between">
                <h1 className="text-3xl m-2">{restaurant.namn}</h1>
                <div className="text-xl m-3">❌</div>
            </div>
            <div className="flex justify-around w-8/12">
                <div className="border-2 border-blue-800 rounded-md p-1"><a href={restaurant.facebook}>Facebook</a></div>
                <div className="border-2 border-blue-800 rounded-md p-1"><a href={restaurant.hemsida}>Hemsida</a></div>
                <div className="border-2 border-blue-800 rounded-md p-1"><a href={restaurant.instagram}>Instagram</a></div>
                <div className="border-2 border-blue-800 rounded-md p-1"><a href={restaurant.epost}>Email</a></div>
            </div>
            <div className="m-3">
                <p>Beskrivning:</p>
                <p>{restaurant.beskrivning}</p>
            </div>
            <br />
            <p className="m-3">Adress: {restaurant.adress}</p>
            <p className="m-3">Ort: {restaurant.ort}</p>
            <p className="m-3">Telefon: {restaurant.telefon}</p>
            <p className="m-3">Vegetarianskt: {restaurant.vego}</p>
        </div>
    )
}

export default RestaurantInfoCard