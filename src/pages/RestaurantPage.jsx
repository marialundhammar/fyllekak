import React from 'react'
import RestaurantInfoCard from '../components/RestaurantInfoCard'
import RestaurantList from '../components/RestaurantList'
import useRestaurants from '../hooks/useRestaurants'

const RestaurantPage = () => {
    const restaurant = useRestaurants()

    return (
        <div>            
            <RestaurantList />
        </div>
    )
}

export default RestaurantPage