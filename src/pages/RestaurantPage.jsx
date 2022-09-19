import React from 'react'
import RestaurantInfoCard from '../components/RestaurantInfoCard'
import useRestaurants from '../hooks/useRestaurants'

const RestaurantPage = () => {
    const restaurant = useRestaurants()

    return (
        <div className="container mx-auto flex justify-center">
            {restaurant.data && restaurant.data.map(res => (
                <RestaurantInfoCard key={res.id} restaurant={res} />
            ))}
            
        </div>
    )
}

export default RestaurantPage