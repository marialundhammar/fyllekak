import React from "react"
import RestaurantList from "./RestaurantList"

const SideBar = ({ restaurants }) => {
	return (
		<div className="flex flex-col">
			<RestaurantList restaurants={restaurants} />
		</div>
	)
}
export default SideBar
