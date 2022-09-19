import React from 'react'
import RestaurantInfoCard from '../components/RestaurantInfoCard'
import RestaurantList from '../components/RestaurantList'
import useRestaurants from '../hooks/useRestaurants'

const RestaurantPage = () => {
    const restaurant = useRestaurants()

    return (
        <div className="container mx-auto flex flex-col justify-center items-center">
            {restaurant.data && restaurant.data.map(res => (
                <RestaurantInfoCard key={res.id} restaurant={res} />
            ))}
            
            <RestaurantList />
        </div>
    )
}

export default RestaurantPage