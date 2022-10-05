import { useEffect, useState } from "react"
import useRestaurants from "../hooks/useRestaurants"
import RestaurantInfoCard from "./RestaurantInfoCard"

import { db } from "../firebase"
import { collection, orderBy, query, where } from "firebase/firestore"
import { useAuthContext } from "../contexts/AuthContext"
import { useFirestoreQueryData } from "@react-query-firebase/firestore"

const RestaurantList = () => {
	const [infoCard, setInfoCard] = useState()
	const [vego, setVego] = useState(false)
	const [price, setPrice] = useState(false)
	const [all, setAll] = useState(true)

	let queryRef

	if (vego) {
		queryRef = query(
			collection(db, "restaurants"),
			where("vego" === vego)
		)
	}
	if (price) {
		queryRef = query(
			collection(db, "restaurants"),
			where("price" === price)
		)
	}

	if (all) {
		queryRef = query(collection(db, "restaurants"))
	}

	const {
		data: restaurant,
		isLoading,
		error,
	} = useFirestoreQueryData(
		["restaurants"],
		queryRef
		// {
		// 	// 	idField: 'id',
		// 	subscribe: true,
		// }
	)

	const toggleCard = (res) => {
		if (infoCard == res) setInfoCard()
		if (infoCard != res) setInfoCard(res)
	}

	return (
		<div className="flex flex-col">
			<div>
				<button
					className="text-contrast-color w-40 border"
					onClick={() => setVego(true)}
				>
					{" "}
					Vegetariskt{" "}
				</button>
			</div>
			<div>
				<button
					className="text-contrast-color w-40 border"
					onClick={() => setPrice(true)}
				>
					{" "}
					Billigt{" "}
				</button>

				<button
					className="text-contrast-color w-40 border"
					onClick={() => setAll(true)}
				>
					{" "}
					Alla{" "}
				</button>
			</div>

			{isLoading && <p>Loading...</p>}

			{error && <p>{error.message}</p>}

			{restaurant && console.log(restaurant)}

			{restaurant && (
				<ul className="bg-blue-400 w-1/5">
					{restaurant &&
						restaurant.map((res) => (
							<div
								className="border border-blue-800 flex justify-between"
								key={restaurant.indexOf(res)}
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
			)}

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
