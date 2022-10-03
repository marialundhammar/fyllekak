import React from 'react'
import RestaurantList from './RestaurantList'
import SearchBar from './SearchBar'

const SideBar = ({ handleSearch }) => {
	return (
		<div className="flex flex-col">
			<SearchBar handleSearch={handleSearch} />
			<RestaurantList />
		</div>
	)
}

export default SideBar