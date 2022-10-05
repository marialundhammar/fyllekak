import { useEffect, useState } from "react"
import useRestaurants from "../hooks/useRestaurants"
import RestaurantInfoCard from "./RestaurantInfoCard"

import { db } from "../firebase"
import { collection, orderBy, query, where } from "firebase/firestore"
import { useAuthContext } from "../contexts/AuthContext"
import { useFirestoreQueryData } from "@react-query-firebase/firestore"

const RestaurantList = ({ restaurants }) => {
	const [infoCard, setInfoCard] = useState()
	const [vego, setVego] = useState(false)
	const [price, setPrice] = useState(false)
	const [showAll, setShowAll] = useState(true)
	const [toggleClassNameAll, setToggleClassNameAll] = useState(
		"text-contrast-color w-40 border"
	)
	const [toggleClassNamePrice, setToggleClassNamePrice] = useState(
		"text-contrast-color w-40 border"
	)
	const [toggleClassNameVego, setToggleClassNameVego] = useState(
		"text-contrast-color w-40 border"
	)

	/* 	let queryRef = collRef */
	/* 
	if (vego) {
		queryRef = query(collRef, where("vego", "==", vego))
	}

	if (price) {
		queryRef = query(collRef, where("price", "==", price))
	}

	if (showAll) {
		queryRef = collRef
	}
 */

	const toggleCard = (res) => {
		if (infoCard == res) setInfoCard()
		if (infoCard != res) setInfoCard(res)
	}

	return (
		<div className="flex flex-col">
			<ul className="bg-blue-400 w-1/5">
				{restaurants &&
					restaurants.map((res) => (
						<div className="border border-blue-800 flex justify-between">
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
			)
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
