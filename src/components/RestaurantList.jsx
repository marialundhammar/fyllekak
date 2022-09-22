import React, { useEffect, useState } from 'react'
import useRestaurants from '../hooks/useRestaurants'
import RestaurantInfoCard from './RestaurantInfoCard'

const RestaurantList = () => {
    const [infoCard, setInfoCard] = useState()
    const restaurant = useRestaurants('restaurants')

    const toggleCard = (res) => {
        if (infoCard == res) setInfoCard()
        if (infoCard != res) setInfoCard(res)
    }

    return (
        <div className="flex">
            <ul className="bg-blue-100 w-1/5">
                {restaurant.data && restaurant.data.map(res => (
                    <div className="border border-blue-800 flex justify-between" key={res.id}>
                        <li className="p-2" onClick={() => toggleCard(res)}>{res.name}</li>
                        <a className="p-2 text-blue-900" href={res.website}>Hemsida</a>
                    </div>
                ))}

            </ul>

            {infoCard &&
                <RestaurantInfoCard key={infoCard.id} restaurant={infoCard} />
            }
        </div>
    )
}

export default RestaurantList