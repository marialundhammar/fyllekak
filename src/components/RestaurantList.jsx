import { useEffect, useState } from "react"
import useRestaurants from "../hooks/useRestaurants"
import RestaurantInfoCard from "./RestaurantInfoCard"

import { db } from '../firebase'
import { collection, orderBy, query, where } from 'firebase/firestore'
import { useAuthContext } from '../contexts/AuthContext'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'


const RestaurantList = () => {
	const [infoCard, setInfoCard] = useState()
	const [vego, setVego] = useState(false)
	const [price, setPrice] = useState(false)
	const [filter, setFilter] = useState('')

	const collRef = collection(db, 'restaurants')

	const { currentUser } = useAuthContext()

	// useEffect(() => {


	// 	return { restaurant, isLoading, error }

	// }, [vego, price])

	// if (vego) {
	// 	queryRef = query(collRef, where('vego', '==', true), where('price', '==', price))
	// }
	// let queryRef

	// if (
	// 	// vego && 
	// 	togglePrice) {
	// 	queryRef = query(collRef, where('price', '==', price))
	// } else {
	// 	console.log('elsedelen')
	// 	queryRef = query(collRef), where('price', 'in', (3))
	// }

	let queryRef

	if (vego && price) {
		queryRef = query((collRef), where('vego', '==', vego), where('price', '==', price))
	}

	// const queryRef = query((collRef),
	// 	vego
	// 		? where('vego', '==', vego)
	// 		: where('vego', 'in', [true, false]),
	// 	price
	// 		? where('price', '==', price)
	// 		: where('price', 'array-contains', [true, false]),
	// )




	const { data: restaurant, isLoading, error } = useFirestoreQueryData(['restaurants', { vego, price }], queryRef)

	const toggleCard = (res) => {
		if (infoCard == res) setInfoCard();
		if (infoCard != res) setInfoCard(res);
	}

	return (
		<div className="flex flex-col">

			<div>
				<button className="text-contrast-color" onClick={() => {
					setVego(!vego)
					setFilter('vego')
				}}> Vegetariskt </button>
				<button className="text-contrast-color" onClick={() => {
					setPrice(!price)
					setFilter('price')
				}}> Billigt </button>
			</div>
			{/* <div>
				 <button className="text-contrast-color" onClick={() => {
					setTogglePrice(true)
					setPrice('1')
				}}> Billigt </button>
				<button className="text-contrast-color" onClick={() => {
					setTogglePrice(true)
					setPrice('2')
				}}> Mellan </button>
				<button className="text-contrast-color" onClick={() => {
					setTogglePrice(true)
					setPrice('3')
				}}> Pricey </button>
				<button className="text-contrast-color" onClick={() => {
					setTogglePrice(false)
					setPrice('1')
				}}> Alla </button>
			</div> */}

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
								<li className="p-2" onClick={() => toggleCard(res)}>{res.name}</li>
								<a className="p-2 text-blue-900" href={res.website}>Website</a>
							</div>
						))}
				</ul>
			)}

			{infoCard && (
				<RestaurantInfoCard key={infoCard.id} restaurant={infoCard} />
			)}
		</div>
	);
};

export default RestaurantList;
