import React from 'react'
import RestaurantList from './RestaurantList'
import SearchBar from './SearchBar'

const Sidebar = ({ handleSearch }) => {
	return (
		<>
			<SearchBar handleSearch={handleSearch} placeholder="Skriv in en adress eller namn på restaurang" />
			<RestaurantList />
		</>
	)
}

export default Sidebar