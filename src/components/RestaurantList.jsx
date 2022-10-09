import { useState } from "react"
import RestaurantInfoCard from "./RestaurantInfoCard"
import { useAuthContext } from "../contexts/AuthContext"

const RestaurantList = ({ restaurants }) => {
	const [infoCard, setInfoCard] = useState()
	const {
		infoCardRestaurant,
		setInfoCardRestaurant,
	} = useAuthContext()

	return (
		<div>
			<ul className="">
				{restaurants &&
					restaurants.map((res) => (
						<div
							className="my-1 border border-contrast-color rounded bg-nav flex justify-between hover:text-contrast-color-dark hover:bg-darkish-blue"
							key={res.id}
							onClick={() => setInfoCardRestaurant(res)}
						>
							<li className="p-2">{res.name}</li>
						</div>
					))}
			</ul>

			{infoCardRestaurant && (
				<RestaurantInfoCard
					key={infoCardRestaurant.id}
					restaurant={infoCardRestaurant}
				/>
			)}
		</div>
	)
}

export default RestaurantList
