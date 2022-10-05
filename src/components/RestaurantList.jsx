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

	const collRef = collection(db, "restaurants")

	let queryRef = collRef

	if (vego) {
		queryRef = query(collRef, where("vego", "==", vego))
	}

	if (price) {
		queryRef = query(collRef, where("price", "==", price))
	}

	if (showAll) {
		queryRef = collRef
	}

	const {
		data: restaurant,
		isLoading,
		error,
	} = useFirestoreQueryData(
		["restaurants", { vego, price }],
		queryRef
	)

	const toggleCard = (res) => {
		if (infoCard == res) setInfoCard()
		if (infoCard != res) setInfoCard(res)
	}

	return (
		<div className="flex flex-col">
			<div>
				<button
					className={
						vego
							? "text-contrast-color w-40 border bg-gray-500 "
							: "text-contrast-color w-40 border "
					}
					onClick={() => {
						setVego(!vego)
						setShowAll(false)
						setToggleClassNameVego(
							vego
								? "text-contrast-color w-40 border bg-gray-500"
								: "text-contrast-color w-40 border "
						)
					}}
				>
					{" "}
					Vegetariskt{" "}
				</button>
				<button
					className={
						price
							? "text-contrast-color w-40 border bg-gray-500 "
							: "text-contrast-color w-40 border "
					}
					onClick={() => {
						setPrice(!price)
						setShowAll(false)
						setToggleClassNamePrice()
					}}
				>
					{" "}
					Billigt{" "}
				</button>
			</div>
			<div>
				<button
					className={
						showAll
							? "text-contrast-color w-40 border bg-gray-500"
							: "text-contrast-color w-40 border "
					}
					onClick={() => {
						setShowAll(true)
						setVego(false)
						setPrice(false)
					}}
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
