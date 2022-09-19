import React from 'react'
import useRestaurants from '../hooks/useRestaurants'

const RestaurantList = () => {
    const restaurant = useRestaurants()

    return (
        <ul className="bg-blue-400 w-1/2">
            {restaurant.data && restaurant.data.map(res => (
                <div className="border border-blue-800 flex justify-between">
                    <li className="p-2" key={res.id}>{res.namn}</li>
                    <a className="p-2 text-blue-900" href={res.hemsida}>Hemsida</a>
                </div>
            ))}
        </ul>
    )
}

export default RestaurantList