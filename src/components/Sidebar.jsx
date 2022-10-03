import React from 'react'
import RestaurantList from './RestaurantList'
import SearchBar from './SearchBar'

const SideBar = ({ handleSearch }) => {
	return (
		<>
			<SearchBar handleSearch={handleSearch} />
			<RestaurantList />
		</>
	)
}

export default SideBar