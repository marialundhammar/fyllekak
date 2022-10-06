import { useState } from "react"
import RestaurantInfoCard from "./RestaurantInfoCard"

const RestaurantList = ({ restaurants }) => {
	const [infoCard, setInfoCard] = useState()

	const toggleCard = (res) => {
		if (infoCard == res) setInfoCard()
		if (infoCard != res) setInfoCard(res)
	}

	return (
		<div>
			<ul className="">
				{restaurants &&
					restaurants.map((res) => (
						<div
							className="border border-contrast-color flex justify-between"
							key={res.id}
						>
							<li
								className="p-2"
								onClick={() => toggleCard(res)}
							>
								{res.name}
							</li>
							<a
								className="p-2 text-blue-900"
								href={res.website}
							>
								Website
							</a>
						</div>
					))}
			</ul>

			{infoCard && (
				<RestaurantInfoCard
					key={infoCard.id}
					restaurant={infoCard}
				/>
			)}
		</div>
	)
}

export default RestaurantList
