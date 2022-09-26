import React from 'react'
import RestaurantInfoCard from '../components/RestaurantInfoCard'
import RestaurantList from '../components/RestaurantList'
import useRestaurants from '../hooks/useRestaurants'

const RestaurantPage = () => {
    const restaurant = useRestaurants('restaurants')

    return (
        <div>
            <RestaurantList />
        </div>
    )
}

export default RestaurantPage