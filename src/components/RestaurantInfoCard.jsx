import React from 'react'

const RestaurantInfoCard = () => {
    return (
        <div className="border-2 border-blue-800 bg-blue-400 w-1/2 rounded-xl">
            <div className="flex justify-between">
                <h1 className="text-3xl m-2">Restaurant name</h1>
                <div className="text-xl m-3">❌</div>
            </div>
            <div className="flex justify-around w-8/12">
                <div className="border-2 border-blue-800 rounded-md p-1">Facebook</div>
                <div className="border-2 border-blue-800 rounded-md p-1">Hemsida</div>
                <div className="border-2 border-blue-800 rounded-md p-1">Instagram</div>
                <div className="border-2 border-blue-800 rounded-md p-1">Email</div>
            </div>
            <div className="m-3">
                <p>Beskrivning</p>
            </div>
            <br />
            <p className="m-3">Adress: </p>
            <p className="m-3">Ort: </p>
            <p className="m-3">Telefon: </p>
            <p className="m-3">Vegetarianskt: </p>
        </div>
    )
}

export default RestaurantInfoCard