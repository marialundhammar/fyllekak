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
							className="my-1 border border-contrast-color rounded bg-nav flex justify-between hover:text-contrast-color-dark hover:bg-darkish-blue"
							key={res.id}
							onClick={() => toggleCard(res)}
						>
							<li
								className="p-2"
							>{res.name}</li>
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
